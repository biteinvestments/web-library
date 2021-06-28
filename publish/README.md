<h1 align="center">BiteUi for Angular</h1>

## Angular版本

当前支持的angular版本<font color=red>`^10.0.0`</font>

## 快速开始

1. 创建一个项目

推荐使用`@angular/cli`创建你的项目

```bash
ng new New-Project
```

2. 安装:

```bash
$ cd New-Project
$ npm i bite-ui
```
## 引入

```typescript
import { UploadModule } from 'bite-ui/upload';
import { ButtonModule } from 'bite-ui/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule,
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## button

```html
<!-- demo -->
<bite-button type="flat" color="primary" [loading]="false">Btn</bite-button>
    
```

```typescript
  @Input() type?: 'flat' | 'stroked' | 'basic' | 'raised' = 'basic';
  @Input() disabled?: boolean;
  @Input() loading?: boolean = false;
  @Input() translate?: 'denied' | 'access' = 'access';
  @Input() color?: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() dark?: boolean = false;
  @Input() full?: boolean = false;
  @Input() size?: 'mini' | 'middle' | 'large' = 'middle';
  @Input() border?: boolean;
  @Output() clickEvent = new EventEmitter<any>();
```


## upload

```html
<!-- demo -->
<bite-upload></bite-upload>
```

```typescript

  /**
   * @description 上传文件的请求方法
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

```

## How to play

Run `ng build bite-ui --prod`

1.如果还没有npm账号，请到官网网站注册一个账号，选用public类型的免费账号就可以
2.已有账号，先确认配置的registry是否指向npm官方registryhttps://registry.npmjs.org/
3.在终端中执行npm login登录已注册的用户

Run `npm publish --access public`

## 参考
(https://segmentfault.com/a/1190000022637243)


# WebLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# BiteUi

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.4.

## Code scaffolding

Run `ng generate component component-name --project bite-ui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project bite-ui`.
> Note: Don't forget to add `--project bite-ui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build bite-ui` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build bite-ui`, go to the dist folder `cd dist/bite-ui` and run `npm publish`.

## Running unit tests

Run `ng test bite-ui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
