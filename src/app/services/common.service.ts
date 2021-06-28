import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
enum FileContainer {
  SHARE = 'share', // 私桶
  PUBLIC = 'public', // 公桶
}
class Res {
  code: number;
  data: any;
  msg: string;
  errors?: any;
  errorKey?: any;
  success?: boolean;
  constructor(code: number, data: object, msg: string, errorKey: any, success: boolean) {
      this.code = code;
      this.data = data;
      this.msg = msg;
      this.errorKey = errorKey;
      this.success = success;
  }
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public http: HttpClient
  ) { }


  /**
   * @description 上传文件
   * @param file 
   * @param container 
   */
   public uploadFile(file: File, container?: FileContainer, http = this.http): Observable<any> {
    const url = 'https://dev1.bite.dev/api/v1.0/file/upload';
    const formData = new FormData();
    formData.append('file', file);
    if (container) {
      formData.append('container', container);
    }
    console.info('111', http)
    
    return http.post(url, formData).pipe(
      map((res: Res) => {
        if (res.success) {
          return res.data;
        }
        throw { msg: res?.msg || 'some error', errorKey: res?.errorKey };
      })
    )
  }
}
