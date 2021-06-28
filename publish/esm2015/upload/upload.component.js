import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
export class UploadComponent {
    constructor(http) {
        this.http = http;
        this.resultEvent = new EventEmitter();
        this.resetTouch = new EventEmitter();
        this.fileList = [];
        this.success = false;
        this.error = false;
        this.uploading = false;
        this.showModalSuccess = false;
        this.showModalLoading = false;
    }
    get classname() {
        let name = [];
        if (this.disabled || this.loading) {
            name.push('upload-disabled');
        }
        if (this.touch) {
            name.push('upload-error');
        }
        return name.join(' ');
    }
    ngOnInit() {
        if (this.disabled && this.value) {
            this.fileList.push({ file: this.value, status: 'finished' });
        }
    }
    ngOnChanges(changes) {
        // 回显默认值
        if (changes.defaultValue && changes.defaultValue.currentValue) {
            this.fileList = [];
            this.fileList.push({ file: changes.defaultValue.currentValue, status: 'finished' });
        }
    }
    ngAfterViewInit() {
        this.fileDomInitUpload();
    }
    fileDomInitUpload() {
        const { inputRef } = this;
        const _ = this;
        this.inputRef.nativeElement.onchange = (e) => {
            const files = inputRef.nativeElement.files;
            for (let i = 0, ii = files.length; i < ii; i++) {
                _.uploadFile(files[i]);
            }
        };
    }
    uploadFile(file) {
        this.uploading = true;
        this.showModalLoading = true;
        this.fileList.push({
            file,
            status: 'uncommit'
        });
        this.uploadFileFn(file, null, this.http).subscribe(data => {
            this.uploadResult = data;
            this.success = true;
            this.fileList[0].status = 'finished';
            this.fileList[0].downloadUrl = data.downloadUrl;
            this.fileList[0].previewUrl = data.previewUrl;
            console.log('this.fileList', this.fileList);
            this.resultEvent.emit(this.uploadResult);
            this.showModalLoading = false;
            this.showModalSuccess = true;
            setTimeout(() => {
                this.showModalSuccess = false;
                this.uploading = false;
            }, 1000);
        }, err => {
            console.log(err);
            this.uploadResult = err;
            this.showModalLoading = false;
            this.error = true;
        });
    }
    chooseFile() {
        if (this.disabled) {
            return;
        }
        if (this.fileList.length === 0) {
            this.inputRef.nativeElement.click();
            this.resetTouch.emit();
        }
    }
    handleDelete() {
        this.inputRef.nativeElement.value = '';
        this.fileList = [];
        this.success = false;
        this.error = false;
    }
    reUpload() {
        this.handleDelete();
        this.chooseFile();
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'bite-upload',
                template: "<div class=\"upload-container\">\n  <div class=\"upload-title\" *ngIf=\"title && !disabled\">\n    {{ title }}\n  </div>\n\n  <div class=\"upload-icon-content\" [class]=\"classname\" (click)=\"chooseFile()\">\n    <span class=\"upload-icon\" *ngIf=\"fileList.length === 0 && !error\">\n      <i class=\"iconfont icon-plus\"></i>\n    </span>\n    <ng-container *ngFor=\"let file of fileList\">\n      <div class=\"file-item\">\n        <!-- <div class=\"file-icon\" *ngIf=\"file.file?.format\">\n          <img *ngIf=\"file.file?.format?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.format?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div>\n        <div class=\"file-icon\" *ngIf=\"file.file?.type\">\n          <img *ngIf=\"file.file?.type?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.type?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div> -->\n        <p class=\"file-name\">\n          <a [href]=\"file?.previewUrl||file?.file?.previewUrl\" target=\"_blank\">{{ file?.file?.name }}</a>\n        </p>\n        <div *ngIf=\"!disabled\" class=\"file-operation\" (click)=\"reUpload(); $event.stopPropagation()\">\n          <i class=\"iconfont icon-reset-arrow\"></i>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"uploading\">\n      <div *ngTemplateOutlet=\"MODAL\"></div>\n    </ng-container>\n  </div>\n  <div class=\"accept-type-content\" *ngIf=\"acceptTip && !disabled && !error\">\n    {{ acceptTip }}\n  </div>\n  <div class=\"accept-type-content error\" *ngIf=\"error\">\n    <div>{{ uploadResult.msg }}</div>\n    <a class=\"bi-primary-text reupload-link\" (click)=\"reUpload(); $event.stopPropagation()\">{{ 'Upload again'}}</a>\n  </div>\n  <input #INPUT_REF style=\"display: none;\" type=\"file\" [accept]=\"accept\">\n</div>\n\n<ng-template #MODAL>\n  <div class=\"upload-modal\">\n    <span *ngIf=\"showModalLoading\" class=\"modal-icon loading-icon\">\n    </span>\n    <span *ngIf=\"showModalSuccess\" class=\"modal-icon modal-success-icon\">\n      <i class=\"iconfont icon-duihao\"></i>\n    </span>\n    <span *ngIf=\"error\" class=\"modal-icon modal-error-icon\" (click)=\"reUpload(); $event.stopPropagation()\">\n      <i class=\"iconfont icon-reset-arrow\"></i>\n    </span>\n  </div>\n</ng-template>",
                styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.upload-container{height:auto;width:100%}.upload-container .upload-title{color:#3e4c5c;font-weight:700;margin-bottom:16px}.upload-container .center-icon,.upload-container .upload-icon-content .upload-icon,.upload-container .upload-icon-content .upload-modal .modal-icon{bottom:0;height:26px;left:0;line-height:26px;margin:auto;position:absolute;right:0;text-align:center;top:0;width:26px}.upload-container .upload-icon-content{background:#f8f9f9;border:2px dashed transparent;border-radius:4px;box-sizing:border-box;color:#717f86;cursor:not-allowed;min-height:60px;position:relative;transition:all .3s ease;width:100%}.upload-container .upload-icon-content .upload-modal{background:hsla(0,0%,100%,.6);border-radius:4px;height:100%;left:0;position:absolute;top:0;width:100%}.upload-container .upload-icon-content .upload-modal .modal-success-icon{color:var(--primary-color)}.upload-container .upload-icon-content .upload-modal .modal-success-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .upload-modal .modal-error-icon{color:#d05f5f}.upload-container .upload-icon-content .upload-icon .iconfont,.upload-container .upload-icon-content .upload-modal .modal-error-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .file-item{align-items:flex-start;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-start;margin-bottom:0;min-height:60px;padding:17px 12px;width:100%}.upload-container .upload-icon-content .file-item .file-icon{flex-shrink:0;height:25px;margin-right:10px;width:25px}.upload-container .upload-icon-content .file-item .file-icon img{height:100%;width:100%}.upload-container .upload-icon-content .file-item .file-name{flex-grow:1;line-height:20px;min-height:25px;word-break:break-all}.upload-container .upload-icon-content .file-item .file-name a{color:#000;text-decoration:none}.upload-container .upload-icon-content .file-item .file-operation{flex-shrink:0;height:16px;justify-self:flex-end;line-height:16px;width:25px}.upload-container .upload-icon-content .file-item:last-child{margin-bottom:0}.upload-container .upload-icon-content:not(.upload-disabled){border:2px dashed #707070;cursor:pointer}.upload-container .upload-icon-content:not(.upload-disabled):hover{background:var(--primary-color-02);border-color:var(--primary-color);color:var(--primary-color)}.upload-container .upload-icon-content.upload-error:not(.upload-disabled){border:2px dashed #d05f5f}.upload-container .upload-icon-content.upload-error:not(.upload-disabled) .upload-icon{color:#d05f5f}.upload-container .accept-type-content{color:#717f86;font-size:14px;padding-top:10px;text-align:left}.upload-container .accept-type-content.error{color:#d05f5f}.upload-container .reupload-link{cursor:pointer}.upload-container .reupload-link:hover{text-decoration:underline}.loading-icon{display:inline-block;height:26px;line-height:26px;position:relative;text-align:center;width:26px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:3px solid #717f86;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:20px;left:0;margin:auto;position:absolute;right:0;top:0;width:20px}"]
            },] }
];
UploadComponent.ctorParameters = () => [
    { type: HttpClient }
];
UploadComponent.propDecorators = {
    uploadFileFn: [{ type: Input }],
    accept: [{ type: Input }],
    acceptTip: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    defaultValue: [{ type: Input }],
    loading: [{ type: Input }],
    touch: [{ type: Input }],
    resultEvent: [{ type: Output }],
    resetTouch: [{ type: Output }],
    inputRef: [{ type: ViewChild, args: ['INPUT_REF',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamFjay9qYWNrL3Byb2plY3Qvd2ViLWxpYnJhcnkvcHJvamVjdHMvYml0ZS11aS91cGxvYWQvIiwic291cmNlcyI6WyJ1cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFjLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHbkgseURBQXlEO0FBQ3pELE1BQU07QUFDTix1QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2QixNQUFNO0FBQ04sd0VBQXdFO0FBQ3hFLDRDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsbUNBQW1DO0FBQ25DLHFCQUFxQjtBQUNyQiwrQ0FBK0M7QUFDL0MsTUFBTTtBQUVOLCtDQUErQztBQUMvQywwQkFBMEI7QUFDMUIsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQixVQUFVO0FBQ1YsMEVBQTBFO0FBQzFFLFVBQVU7QUFDVixrRUFBa0U7QUFDbEUsTUFBTTtBQUNOLElBQUk7QUFNTixNQUFNLE9BQU8sZUFBZTtJQTBDMUIsWUFDUyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBeEJmLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0QyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUcvQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBZXJCLENBQUM7SUFiTCxJQUFJLFNBQVM7UUFDWCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFNRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFDRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsUUFBUTtRQUNSLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtTQUNuRjtJQUdILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUk7WUFDSixNQUFNLEVBQUUsVUFBVTtTQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7O1lBbElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsdzVFQUFzQzs7YUFFdkM7OztZQWhDUSxVQUFVOzs7MkJBd0NoQixLQUFLO3FCQUlMLEtBQUs7d0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzswQkFDTCxNQUFNO3lCQUNOLE1BQU07dUJBRU4sU0FBUyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbiAgLy8gcmVhZG9ubHkgYXBpUHJlZml4ID0gQ29tbW9uU2V0dGluZy5BUEkgKyAnL3YxLjAvZmlsZSc7XG4gIC8vIC8qKlxuICAvLyAgKiBAZGVzY3JpcHRpb24g5LiK5Lyg5paH5Lu2XG4gIC8vICAqIEBwYXJhbSBmaWxlIFxuICAvLyAgKiBAcGFyYW0gY29udGFpbmVyIFxuICAvLyAgKi9cbiAgLy8gIHVwbG9hZEZpbGUoZmlsZTogRmlsZSwgY29udGFpbmVyPzogRmlsZUNvbnRhaW5lcik6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgY29uc3QgdXJsID0gdGhpcy5hcGlQcmVmaXggKyAnL3VwbG9hZCc7XG4gIC8vICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgLy8gICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgLy8gICBpZiAoY29udGFpbmVyKSB7XG4gIC8vICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NvbnRhaW5lcicsIGNvbnRhaW5lcik7XG4gIC8vICAgfVxuICAgIFxuICAvLyAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhKS5waXBlKFxuICAvLyAgICAgbWFwKChyZXM6IFJlcykgPT4ge1xuICAvLyAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgLy8gICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgdGhyb3cgeyBtc2c6IHJlcz8ubXNnIHx8ICdzb21lIGVycm9yJywgZXJyb3JLZXk6IHJlcz8uZXJyb3JLZXkgfTtcbiAgLy8gICAgIH0pLFxuICAvLyAgICAgY2F0Y2hFcnJvcih0aGlzLmxvZ1N2LmhhbmRsZUVycm9yPFJlcz4oJ1Bvc3QgdXBsb2FkIEZpbGUnKSlcbiAgLy8gICApXG4gIC8vIH1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpdGUtdXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3VwbG9hZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiDkuIrkvKDmlofku7ZcbiAgICogQHBhcmFtIGZpbGUgXG4gICAqIEBwYXJhbSBjb250YWluZXIgXG4gICAqL1xuICBASW5wdXQoKSB1cGxvYWRGaWxlRm46IGFueVxuXG4gIFxuXG4gIEBJbnB1dCgpIGFjY2VwdD86IHN0cmluZztcbiAgQElucHV0KCkgYWNjZXB0VGlwPzogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB2YWx1ZT86IGFueTtcbiAgQElucHV0KCkgZGVmYXVsdFZhbHVlPzphbnk7IC8vIOW8guatpeWbnuaYvuWAvFxuICBASW5wdXQoKSBsb2FkaW5nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdG91Y2g/OiBib29sZWFuO1xuICBAT3V0cHV0KCkgcmVzdWx0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc2V0VG91Y2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdJTlBVVF9SRUYnKSBpbnB1dFJlZjogRWxlbWVudFJlZjtcbiAgZmlsZUxpc3QgPSBbXTtcbiAgdXBsb2FkUmVzdWx0OiBhbnk7XG4gIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgZXJyb3IgPSBmYWxzZTtcbiAgdXBsb2FkaW5nID0gZmFsc2U7XG4gIHNob3dNb2RhbFN1Y2Nlc3MgPSBmYWxzZTtcbiAgc2hvd01vZGFsTG9hZGluZyA9IGZhbHNlO1xuXG4gIGdldCBjbGFzc25hbWUoKTogc3RyaW5nIHtcbiAgICBsZXQgbmFtZSA9IFtdO1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMubG9hZGluZykge1xuICAgICAgbmFtZS5wdXNoKCd1cGxvYWQtZGlzYWJsZWQnKVxuICAgIH1cbiAgICBpZiAodGhpcy50b3VjaCkge1xuICAgICAgbmFtZS5wdXNoKCd1cGxvYWQtZXJyb3InKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS5qb2luKCcgJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsZUxpc3QucHVzaCh7IGZpbGU6IHRoaXMudmFsdWUsIHN0YXR1czogJ2ZpbmlzaGVkJ30pO1xuICAgIH1cbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8g5Zue5pi+6buY6K6k5YC8XG4gICAgaWYgKGNoYW5nZXMuZGVmYXVsdFZhbHVlICYmIGNoYW5nZXMuZGVmYXVsdFZhbHVlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5maWxlTGlzdCA9IFtdXG4gICAgICB0aGlzLmZpbGVMaXN0LnB1c2goeyBmaWxlOiBjaGFuZ2VzLmRlZmF1bHRWYWx1ZS5jdXJyZW50VmFsdWUsIHN0YXR1czogJ2ZpbmlzaGVkJ30pXG4gICAgfVxuXG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVEb21Jbml0VXBsb2FkKCk7XG4gIH1cblxuICBmaWxlRG9tSW5pdFVwbG9hZCgpIHtcbiAgICBjb25zdCB7IGlucHV0UmVmIH0gPSB0aGlzO1xuICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgIHRoaXMuaW5wdXRSZWYubmF0aXZlRWxlbWVudC5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICBjb25zdCBmaWxlcyA9IGlucHV0UmVmLm5hdGl2ZUVsZW1lbnQuZmlsZXM7XG4gICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBmaWxlcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIF8udXBsb2FkRmlsZShmaWxlc1tpXSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHVwbG9hZEZpbGUoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dNb2RhbExvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaCh7XG4gICAgICBmaWxlLFxuICAgICAgc3RhdHVzOiAndW5jb21taXQnXG4gICAgfSk7XG4gICAgdGhpcy51cGxvYWRGaWxlRm4oZmlsZSwgbnVsbCwgdGhpcy5odHRwKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnVwbG9hZFJlc3VsdCA9IGRhdGE7XG4gICAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlTGlzdFswXS5zdGF0dXMgPSAnZmluaXNoZWQnO1xuICAgICAgdGhpcy5maWxlTGlzdFswXS5kb3dubG9hZFVybCA9IGRhdGEuZG93bmxvYWRVcmw7XG4gICAgICB0aGlzLmZpbGVMaXN0WzBdLnByZXZpZXdVcmwgPSBkYXRhLnByZXZpZXdVcmw7XG4gICAgICBjb25zb2xlLmxvZygndGhpcy5maWxlTGlzdCcsIHRoaXMuZmlsZUxpc3QpO1xuICAgICAgdGhpcy5yZXN1bHRFdmVudC5lbWl0KHRoaXMudXBsb2FkUmVzdWx0KTtcbiAgICAgIHRoaXMuc2hvd01vZGFsTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93TW9kYWxTdWNjZXNzID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dNb2RhbFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgdGhpcy51cGxvYWRSZXN1bHQgPSBlcnI7XG4gICAgICB0aGlzLnNob3dNb2RhbExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBjaG9vc2VGaWxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnJlc2V0VG91Y2guZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURlbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy5zdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICB9XG5cbiAgcmVVcGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVEZWxldGUoKTtcbiAgICB0aGlzLmNob29zZUZpbGUoKTtcbiAgfVxuXG59XG4iXX0=