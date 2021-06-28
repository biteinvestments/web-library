import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

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
@Component({
  selector: 'bite-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  /**
   * @description 上传文件
   * @param file 
   * @param container 
   */
  @Input() uploadFileFn

  

  @Input() accept?: string;
  @Input() acceptTip?: string;
  @Input() title?: string;
  @Input() disabled?: boolean;
  @Input() value?: any;
  @Input() defaultValue?:any; // 异步回显值
  @Input() loading?: boolean;
  @Input() touch?: boolean;
  @Output() resultEvent = new EventEmitter<any>();
  @Output() resetTouch = new EventEmitter<any>();

  @ViewChild('INPUT_REF') inputRef: ElementRef;
  fileList = [];
  uploadResult: any;
  success = false;
  error = false;
  uploading = false;
  showModalSuccess = false;
  showModalLoading = false;

  get classname(): string {
    let name = [];
    if (this.disabled || this.loading) {
      name.push('upload-disabled')
    }
    if (this.touch) {
      name.push('upload-error')
    }
    return name.join(' ');
  }

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.disabled && this.value) {
      this.fileList.push({ file: this.value, status: 'finished'});
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // 回显默认值
    if (changes.defaultValue && changes.defaultValue.currentValue) {
      this.fileList = []
      this.fileList.push({ file: changes.defaultValue.currentValue, status: 'finished'})
    }


  }

  ngAfterViewInit(): void {
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

  uploadFile(file: File): void {
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
    })
  }

  chooseFile(): void {
    if (this.disabled) {
      return;
    }
    if (this.fileList.length === 0) {
      this.inputRef.nativeElement.click();
      this.resetTouch.emit();
    }
  }

  handleDelete(): void {
    this.inputRef.nativeElement.value = '';
    this.fileList = [];
    this.success = false;
    this.error = false;
  }

  reUpload(): void {
    this.handleDelete();
    this.chooseFile();
  }

}
