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
    constructor() {
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
        this.uploadFileFn(file).subscribe(data => {
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
                template: "<div class=\"upload-container\">\n  <div class=\"upload-title\" *ngIf=\"title && !disabled\">\n    {{ title }}\n  </div>\n\n  <div class=\"upload-icon-content\" [class]=\"classname\" (click)=\"chooseFile()\">\n    <span class=\"upload-icon\" *ngIf=\"fileList.length === 0 && !error\">\n      <i class=\"iconfont icon-plus\"></i>\n    </span>\n    <ng-container *ngFor=\"let file of fileList\">\n      <div class=\"file-item\">\n        <div class=\"file-icon\" *ngIf=\"file.file?.format\">\n          <img *ngIf=\"file.file?.format?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.format?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div>\n        <div class=\"file-icon\" *ngIf=\"file.file?.type\">\n          <img *ngIf=\"file.file?.type?.indexOf('image') > -1\" src=\"../../common/assets/pic.png\" alt=\"\">\n          <img *ngIf=\"file.file?.type?.indexOf('pdf') > -1\" src=\"../../common/assets/pdf.png\" alt=\"\">\n        </div>\n        <p class=\"file-name\">\n          <a [href]=\"file?.previewUrl||file?.file?.previewUrl\" target=\"_blank\">{{ file?.file?.name }}</a>\n        </p>\n        <div *ngIf=\"!disabled\" class=\"file-operation\" (click)=\"reUpload(); $event.stopPropagation()\">\n          <i class=\"iconfont icon-reset-arrow\"></i>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"uploading\">\n      <div *ngTemplateOutlet=\"MODAL\"></div>\n    </ng-container>\n  </div>\n  <div class=\"accept-type-content\" *ngIf=\"acceptTip && !disabled && !error\">\n    {{ acceptTip }}\n  </div>\n  <div class=\"accept-type-content error\" *ngIf=\"error\">\n    <div>{{ uploadResult.msg }}</div>\n    <a class=\"bi-primary-text reupload-link\" (click)=\"reUpload(); $event.stopPropagation()\">{{ 'inbox.button.reUpload'}}</a>\n  </div>\n  <input #INPUT_REF style=\"display: none;\" type=\"file\" [accept]=\"accept\">\n</div>\n\n<ng-template #MODAL>\n  <div class=\"upload-modal\">\n    <span *ngIf=\"showModalLoading\" class=\"modal-icon loading-icon\">\n    </span>\n    <span *ngIf=\"showModalSuccess\" class=\"modal-icon modal-success-icon\">\n      <i class=\"iconfont icon-duihao\"></i>\n    </span>\n    <span *ngIf=\"error\" class=\"modal-icon modal-error-icon\" (click)=\"reUpload(); $event.stopPropagation()\">\n      <i class=\"iconfont icon-reset-arrow\"></i>\n    </span>\n  </div>\n</ng-template>",
                styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.upload-container{height:auto;width:100%}.upload-container .upload-title{color:#3e4c5c;font-weight:700;margin-bottom:16px}.upload-container .center-icon,.upload-container .upload-icon-content .upload-icon,.upload-container .upload-icon-content .upload-modal .modal-icon{bottom:0;height:26px;left:0;line-height:26px;margin:auto;position:absolute;right:0;text-align:center;top:0;width:26px}.upload-container .upload-icon-content{background:#f8f9f9;border:2px dashed transparent;border-radius:4px;box-sizing:border-box;color:#717f86;cursor:not-allowed;min-height:60px;position:relative;transition:all .3s ease;width:100%}.upload-container .upload-icon-content .upload-modal{background:hsla(0,0%,100%,.6);border-radius:4px;height:100%;left:0;position:absolute;top:0;width:100%}.upload-container .upload-icon-content .upload-modal .modal-success-icon{color:var(--primary-color)}.upload-container .upload-icon-content .upload-modal .modal-success-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .upload-modal .modal-error-icon{color:#d05f5f}.upload-container .upload-icon-content .upload-icon .iconfont,.upload-container .upload-icon-content .upload-modal .modal-error-icon .iconfont{font-size:26px}.upload-container .upload-icon-content .file-item{align-items:flex-start;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-start;margin-bottom:0;min-height:60px;padding:17px 12px;width:100%}.upload-container .upload-icon-content .file-item .file-icon{flex-shrink:0;height:25px;margin-right:10px;width:25px}.upload-container .upload-icon-content .file-item .file-icon img{height:100%;width:100%}.upload-container .upload-icon-content .file-item .file-name{flex-grow:1;line-height:20px;min-height:25px;word-break:break-all}.upload-container .upload-icon-content .file-item .file-name a{color:#000;text-decoration:none}.upload-container .upload-icon-content .file-item .file-operation{flex-shrink:0;height:16px;justify-self:flex-end;line-height:16px;width:25px}.upload-container .upload-icon-content .file-item:last-child{margin-bottom:0}.upload-container .upload-icon-content:not(.upload-disabled){border:2px dashed #707070;cursor:pointer}.upload-container .upload-icon-content:not(.upload-disabled):hover{background:var(--primary-color-02);border-color:var(--primary-color);color:var(--primary-color)}.upload-container .upload-icon-content.upload-error:not(.upload-disabled){border:2px dashed #d05f5f}.upload-container .upload-icon-content.upload-error:not(.upload-disabled) .upload-icon{color:#d05f5f}.upload-container .accept-type-content{color:#717f86;font-size:14px;padding-top:10px;text-align:left}.upload-container .accept-type-content.error{color:#d05f5f}.upload-container .reupload-link{cursor:pointer}.upload-container .reupload-link:hover{text-decoration:underline}.loading-icon{display:inline-block;height:26px;line-height:26px;position:relative;text-align:center;width:26px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:3px solid #717f86;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:20px;left:0;margin:auto;position:absolute;right:0;top:0;width:20px}"]
            },] }
];
UploadComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamFjay9qYWNrL3Byb2plY3Qvd2ViLWxpYnJhcnkvcHJvamVjdHMvYml0ZS11aS91cGxvYWQvIiwic291cmNlcyI6WyJ1cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWMsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUduSCx5REFBeUQ7QUFDekQsTUFBTTtBQUNOLHVCQUF1QjtBQUN2QixrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLE1BQU07QUFDTix3RUFBd0U7QUFDeEUsNENBQTRDO0FBQzVDLHFDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMscUJBQXFCO0FBQ3JCLCtDQUErQztBQUMvQyxNQUFNO0FBRU4sK0NBQStDO0FBQy9DLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0IsMkJBQTJCO0FBQzNCLFVBQVU7QUFDViwwRUFBMEU7QUFDMUUsVUFBVTtBQUNWLGtFQUFrRTtBQUNsRSxNQUFNO0FBQ04sSUFBSTtBQU1OLE1BQU0sT0FBTyxlQUFlO0lBMEMxQjtRQXZCVSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFHL0MsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVkLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQWNyQixDQUFDO0lBWkwsSUFBSSxTQUFTO1FBQ1gsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7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dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxLQUFLOzBCQUNMLE1BQU07eUJBQ04sTUFBTTt1QkFFTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4gIC8vIHJlYWRvbmx5IGFwaVByZWZpeCA9IENvbW1vblNldHRpbmcuQVBJICsgJy92MS4wL2ZpbGUnO1xuICAvLyAvKipcbiAgLy8gICogQGRlc2NyaXB0aW9uIOS4iuS8oOaWh+S7tlxuICAvLyAgKiBAcGFyYW0gZmlsZSBcbiAgLy8gICogQHBhcmFtIGNvbnRhaW5lciBcbiAgLy8gICovXG4gIC8vICB1cGxvYWRGaWxlKGZpbGU6IEZpbGUsIGNvbnRhaW5lcj86IEZpbGVDb250YWluZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgIGNvbnN0IHVybCA9IHRoaXMuYXBpUHJlZml4ICsgJy91cGxvYWQnO1xuICAvLyAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIC8vICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gIC8vICAgaWYgKGNvbnRhaW5lcikge1xuICAvLyAgICAgZm9ybURhdGEuYXBwZW5kKCdjb250YWluZXInLCBjb250YWluZXIpO1xuICAvLyAgIH1cbiAgICBcbiAgLy8gICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBmb3JtRGF0YSkucGlwZShcbiAgLy8gICAgIG1hcCgocmVzOiBSZXMpID0+IHtcbiAgLy8gICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gIC8vICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHRocm93IHsgbXNnOiByZXM/Lm1zZyB8fCAnc29tZSBlcnJvcicsIGVycm9yS2V5OiByZXM/LmVycm9yS2V5IH07XG4gIC8vICAgICB9KSxcbiAgLy8gICAgIGNhdGNoRXJyb3IodGhpcy5sb2dTdi5oYW5kbGVFcnJvcjxSZXM+KCdQb3N0IHVwbG9hZCBGaWxlJykpXG4gIC8vICAgKVxuICAvLyB9XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXRlLXVwbG9hZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi91cGxvYWQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24g5LiK5Lyg5paH5Lu2XG4gICAqIEBwYXJhbSBmaWxlIFxuICAgKiBAcGFyYW0gY29udGFpbmVyIFxuICAgKi9cbiAgQElucHV0KCkgdXBsb2FkRmlsZUZuOiBhbnlcblxuICBcblxuICBASW5wdXQoKSBhY2NlcHQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjY2VwdFRpcD86IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdmFsdWU/OiBhbnk7XG4gIEBJbnB1dCgpIGRlZmF1bHRWYWx1ZT86YW55OyAvLyDlvILmraXlm57mmL7lgLxcbiAgQElucHV0KCkgbG9hZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoPzogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHJlc3VsdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZXNldFRvdWNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnSU5QVVRfUkVGJykgaW5wdXRSZWY6IEVsZW1lbnRSZWY7XG4gIGZpbGVMaXN0ID0gW107XG4gIHVwbG9hZFJlc3VsdDogYW55O1xuICBzdWNjZXNzID0gZmFsc2U7XG4gIGVycm9yID0gZmFsc2U7XG4gIHVwbG9hZGluZyA9IGZhbHNlO1xuICBzaG93TW9kYWxTdWNjZXNzID0gZmFsc2U7XG4gIHNob3dNb2RhbExvYWRpbmcgPSBmYWxzZTtcblxuICBnZXQgY2xhc3NuYW1lKCk6IHN0cmluZyB7XG4gICAgbGV0IG5hbWUgPSBbXTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmcpIHtcbiAgICAgIG5hbWUucHVzaCgndXBsb2FkLWRpc2FibGVkJylcbiAgICB9XG4gICAgaWYgKHRoaXMudG91Y2gpIHtcbiAgICAgIG5hbWUucHVzaCgndXBsb2FkLWVycm9yJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUuam9pbignICcpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgJiYgdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5maWxlTGlzdC5wdXNoKHsgZmlsZTogdGhpcy52YWx1ZSwgc3RhdHVzOiAnZmluaXNoZWQnfSk7XG4gICAgfVxuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyDlm57mmL7pu5jorqTlgLxcbiAgICBpZiAoY2hhbmdlcy5kZWZhdWx0VmFsdWUgJiYgY2hhbmdlcy5kZWZhdWx0VmFsdWUuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmZpbGVMaXN0ID0gW11cbiAgICAgIHRoaXMuZmlsZUxpc3QucHVzaCh7IGZpbGU6IGNoYW5nZXMuZGVmYXVsdFZhbHVlLmN1cnJlbnRWYWx1ZSwgc3RhdHVzOiAnZmluaXNoZWQnfSlcbiAgICB9XG5cblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmlsZURvbUluaXRVcGxvYWQoKTtcbiAgfVxuXG4gIGZpbGVEb21Jbml0VXBsb2FkKCkge1xuICAgIGNvbnN0IHsgaW5wdXRSZWYgfSA9IHRoaXM7XG4gICAgY29uc3QgXyA9IHRoaXM7XG4gICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50Lm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gaW5wdXRSZWYubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGZpbGVzLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgICAgXy51cGxvYWRGaWxlKGZpbGVzW2ldKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdXBsb2FkRmlsZShmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuc2hvd01vZGFsTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHtcbiAgICAgIGZpbGUsXG4gICAgICBzdGF0dXM6ICd1bmNvbW1pdCdcbiAgICB9KTtcbiAgICB0aGlzLnVwbG9hZEZpbGVGbihmaWxlKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnVwbG9hZFJlc3VsdCA9IGRhdGE7XG4gICAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlTGlzdFswXS5zdGF0dXMgPSAnZmluaXNoZWQnO1xuICAgICAgdGhpcy5maWxlTGlzdFswXS5kb3dubG9hZFVybCA9IGRhdGEuZG93bmxvYWRVcmw7XG4gICAgICB0aGlzLmZpbGVMaXN0WzBdLnByZXZpZXdVcmwgPSBkYXRhLnByZXZpZXdVcmw7XG4gICAgICBjb25zb2xlLmxvZygndGhpcy5maWxlTGlzdCcsIHRoaXMuZmlsZUxpc3QpO1xuICAgICAgdGhpcy5yZXN1bHRFdmVudC5lbWl0KHRoaXMudXBsb2FkUmVzdWx0KTtcbiAgICAgIHRoaXMuc2hvd01vZGFsTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93TW9kYWxTdWNjZXNzID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dNb2RhbFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgdGhpcy51cGxvYWRSZXN1bHQgPSBlcnI7XG4gICAgICB0aGlzLnNob3dNb2RhbExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBjaG9vc2VGaWxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICB0aGlzLnJlc2V0VG91Y2guZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURlbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy5zdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICB9XG5cbiAgcmVVcGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVEZWxldGUoKTtcbiAgICB0aGlzLmNob29zZUZpbGUoKTtcbiAgfVxuXG59XG4iXX0=