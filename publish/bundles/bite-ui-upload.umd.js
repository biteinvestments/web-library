(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('bite-ui/upload', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['bite-ui'] = global['bite-ui'] || {}, global['bite-ui'].upload = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    // readonly apiPrefix = CommonSetting.API + '/v1.0/file';
    // /**
    //  * @description 上传文件
    //  * @param file 
    //  * @param container 
    //  */
    //  uploadFile(file: File, container?: FileContainer): Observable<any> {
    //   const url = this.apiPrefix + '/upload';
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   if (container) {
    //     formData.append('container', container);
    //   }
    //   return this.http.post(url, formData).pipe(
    //     map((res: Res) => {
    //       if (res.success) {
    //         return res.data;
    //       }
    //       throw { msg: res?.msg || 'some error', errorKey: res?.errorKey };
    //     }),
    //     catchError(this.logSv.handleError<Res>('Post upload File'))
    //   )
    // }
    var UploadComponent = /** @class */ (function () {
        function UploadComponent() {
            this.resultEvent = new core.EventEmitter();
            this.resetTouch = new core.EventEmitter();
            this.fileList = [];
            this.success = false;
            this.error = false;
            this.uploading = false;
            this.showModalSuccess = false;
            this.showModalLoading = false;
        }
        Object.defineProperty(UploadComponent.prototype, "classname", {
            get: function () {
                var name = [];
                if (this.disabled || this.loading) {
                    name.push('upload-disabled');
                }
                if (this.touch) {
                    name.push('upload-error');
                }
                return name.join(' ');
            },
            enumerable: false,
            configurable: true
        });
        UploadComponent.prototype.ngOnInit = function () {
            if (this.disabled && this.value) {
                this.fileList.push({ file: this.value, status: 'finished' });
            }
        };
        UploadComponent.prototype.ngOnChanges = function (changes) {
            // 回显默认值
            if (changes.defaultValue && changes.defaultValue.currentValue) {
                this.fileList = [];
                this.fileList.push({ file: changes.defaultValue.currentValue, status: 'finished' });
            }
        };
        UploadComponent.prototype.ngAfterViewInit = function () {
            this.fileDomInitUpload();
        };
        UploadComponent.prototype.fileDomInitUpload = function () {
            var inputRef = this.inputRef;
            var _ = this;
            this.inputRef.nativeElement.onchange = function (e) {
                var files = inputRef.nativeElement.files;
                for (var i = 0, ii = files.length; i < ii; i++) {
                    _.uploadFile(files[i]);
                }
            };
        };
        UploadComponent.prototype.uploadFile = function (file) {
            var _this = this;
            this.uploading = true;
            this.showModalLoading = true;
            this.fileList.push({
                file: file,
                status: 'uncommit'
            });
            this.uploadFileFn(file).subscribe(function (data) {
                _this.uploadResult = data;
                _this.success = true;
                _this.fileList[0].status = 'finished';
                _this.fileList[0].downloadUrl = data.downloadUrl;
                _this.fileList[0].previewUrl = data.previewUrl;
                console.log('this.fileList', _this.fileList);
                _this.resultEvent.emit(_this.uploadResult);
                _this.showModalLoading = false;
                _this.showModalSuccess = true;
                setTimeout(function () {
                    _this.showModalSuccess = false;
                    _this.uploading = false;
                }, 1000);
            }, function (err) {
                console.log(err);
                _this.uploadResult = err;
                _this.showModalLoading = false;
                _this.error = true;
            });
        };
        UploadComponent.prototype.chooseFile = function () {
            if (this.disabled) {
                return;
            }
            if (this.fileList.length === 0) {
                this.inputRef.nativeElement.click();
                this.resetTouch.emit();
            }
        };
        UploadComponent.prototype.handleDelete = function () {
            this.inputRef.nativeElement.value = '';
            this.fileList = [];
            this.success = false;
            this.error = false;
        };
        UploadComponent.prototype.reUpload = function () {
            this.handleDelete();
            this.chooseFile();
        };
        return UploadComponent;
    }());
    UploadComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bite-upload',
                    template: "<div class=\"upload-container\">\n  <div class=\"upload-title\" *ngIf=\"title && !disabled\">\n    {{ title }}\n  </div>\n\n  <div class=\"upload-icon-content\" [class]=\"classname\" (click)=\"chooseFile()\">\n    <span class=\"upload-icon\" *ngIf=\"fileList.length === 0 && !error\">\n      <i class=\"iconfont icon-plus\"></i>\n    </span>\n    <ng-container *ngFor=\"let file of fileList\">\n      <div class=\"file-item\">\n        <div class=\"file-icon\" *ngIf=\"file.file?.format\">\n          <img *ngIf=\"file.file?.format?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.format?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div>\n        <div class=\"file-icon\" *ngIf=\"file.file?.type\">\n          <img *ngIf=\"file.file?.type?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.type?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div>\n        <p class=\"file-name\">\n          <a [href]=\"file?.previewUrl||file?.file?.previewUrl\" target=\"_blank\">{{ file?.file?.name }}</a>\n        </p>\n        <div *ngIf=\"!disabled\" class=\"file-operation\" (click)=\"reUpload(); $event.stopPropagation()\">\n          <i class=\"iconfont icon-reset-arrow\"></i>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"uploading\">\n      <div *ngTemplateOutlet=\"MODAL\"></div>\n    </ng-container>\n  </div>\n  <div class=\"accept-type-content\" *ngIf=\"acceptTip && !disabled && !error\">\n    {{ acceptTip | translate }}\n  </div>\n  <div class=\"accept-type-content error\" *ngIf=\"error\">\n    <div>{{ uploadResult.msg }}</div>\n    <a class=\"bi-primary-text reupload-link\" (click)=\"reUpload(); $event.stopPropagation()\">{{ 'inbox.button.reUpload' |\n      translate }}</a>\n  </div>\n  <input #INPUT_REF style=\"display: none;\" type=\"file\" [accept]=\"accept\">\n</div>\n\n<ng-template #MODAL>\n  <div class=\"upload-modal\">\n    <span *ngIf=\"showModalLoading\" class=\"modal-icon loading-icon\">\n    </span>\n    <span *ngIf=\"showModalSuccess\" class=\"modal-icon modal-success-icon\">\n      <i class=\"iconfont icon-duihao\"></i>\n    </span>\n    <span *ngIf=\"error\" class=\"modal-icon modal-error-icon\" (click)=\"reUpload(); $event.stopPropagation()\">\n      <i class=\"iconfont icon-reset-arrow\"></i>\n    </span>\n  </div>\n</ng-template>",
                    styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.upload-container{height:auto;width:100%}.upload-container .upload-title{color:#3e4c5c;font-weight:700;margin-bottom:16px}.upload-container .center-icon,.upload-container .upload-icon-content .upload-icon,.upload-container .upload-icon-content .upload-modal .modal-icon{bottom:0;height:26px;left:0;line-height:26px;margin:auto;position:absolute;right:0;text-align:center;top:0;width:26px}.upload-container .upload-icon-content{background:#f8f9f9;border:2px dashed transparent;border-radius:4px;box-sizing:border-box;color:#717f86;cursor:not-allowed;min-height:60px;position:relative;transition:all .3s ease;width:100%}.upload-container .upload-icon-content .upload-modal{background:hsla(0,0%,100%,.6);border-radius:4px;height:100%;left:0;position:absolute;top:0;width:100%}.upload-container .upload-icon-content .upload-modal .modal-success-icon{color:var(--primary-color)}.upload-container .upload-icon-content .upload-modal .modal-success-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .upload-modal .modal-error-icon{color:#d05f5f}.upload-container .upload-icon-content .upload-icon .iconfont,.upload-container .upload-icon-content .upload-modal .modal-error-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .file-item{align-items:flex-start;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-start;margin-bottom:0;min-height:60px;padding:17px 12px;width:100%}.upload-container .upload-icon-content .file-item .file-icon{flex-shrink:0;height:25px;margin-right:10px;width:25px}.upload-container .upload-icon-content .file-item .file-icon img{height:100%;width:100%}.upload-container .upload-icon-content .file-item .file-name{flex-grow:1;line-height:20px;min-height:25px;word-break:break-all}.upload-container .upload-icon-content .file-item .file-name a{color:#000;text-decoration:none}.upload-container .upload-icon-content .file-item .file-operation{flex-shrink:0;height:16px;justify-self:flex-end;line-height:16px;width:25px}.upload-container .upload-icon-content .file-item:last-child{margin-bottom:0}.upload-container .upload-icon-content:not(.upload-disabled){border:2px dashed #707070;cursor:pointer}.upload-container .upload-icon-content:not(.upload-disabled):hover{background:var(--primary-color-02);border-color:var(--primary-color);color:var(--primary-color)}.upload-container .upload-icon-content.upload-error:not(.upload-disabled){border:2px dashed #d05f5f}.upload-container .upload-icon-content.upload-error:not(.upload-disabled) .upload-icon{color:#d05f5f}.upload-container .accept-type-content{color:#717f86;font-size:14px;padding-top:10px;text-align:left}.upload-container .accept-type-content.error{color:#d05f5f}.upload-container .reupload-link{cursor:pointer}.upload-container .reupload-link:hover{text-decoration:underline}.loading-icon{display:inline-block;height:26px;line-height:26px;position:relative;text-align:center;width:26px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:3px solid #717f86;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:20px;left:0;margin:auto;position:absolute;right:0;top:0;width:20px}"]
                },] }
    ];
    UploadComponent.ctorParameters = function () { return []; };
    UploadComponent.propDecorators = {
        uploadFileFn: [{ type: core.Input }],
        accept: [{ type: core.Input }],
        acceptTip: [{ type: core.Input }],
        title: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        value: [{ type: core.Input }],
        defaultValue: [{ type: core.Input }],
        loading: [{ type: core.Input }],
        touch: [{ type: core.Input }],
        resultEvent: [{ type: core.Output }],
        resetTouch: [{ type: core.Output }],
        inputRef: [{ type: core.ViewChild, args: ['INPUT_REF',] }]
    };

    var UploadModule = /** @class */ (function () {
        function UploadModule() {
        }
        return UploadModule;
    }());
    UploadModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [UploadComponent],
                    exports: [UploadComponent],
                    imports: [
                        common.CommonModule
                    ]
                },] }
    ];

    /*
    * Public API Surface of Button
    */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.UploadComponent = UploadComponent;
    exports.UploadModule = UploadModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bite-ui-upload.umd.js.map
