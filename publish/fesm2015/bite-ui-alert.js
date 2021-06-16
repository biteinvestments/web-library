import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class AlertComponent {
    constructor() {
        // Alert 类型
        this.type = 'info';
        // 是否显示图标，用于支持用户自定义图标
        this.showIcon = true;
        // 是否可关闭
        this.closeable = false;
        // 关闭回调
        this.closeEvent = new EventEmitter();
        this.hide = false;
    }
    ngOnInit() {
    }
    close() {
        this.closeEvent.emit(true);
        this.hide = true;
    }
}
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'bite-alert',
                template: "<!-- This is an useless demo -->\n<div class=\"bite-alert {{ type }} \" *ngIf=\"!hide\">\n  This is an useless demo\n  <span class=\"bite-alert-icon icon-{{ type }}\" *ngIf=\"showIcon\"></span>\n  \u3010<ng-content></ng-content>\u3011\n\n  <button type=\"button\" class=\"bite-close\" (click)=\"close()\" *ngIf=\"closeable\">Close</button>\n</div>\n",
                styles: [".bite-alert{background-color:rgba(37,159,215,.08);padding:20px}"]
            },] }
];
AlertComponent.ctorParameters = () => [];
AlertComponent.propDecorators = {
    type: [{ type: Input }],
    showIcon: [{ type: Input }],
    closeable: [{ type: Input }],
    closeEvent: [{ type: Output }]
};

class AlertModule {
}
AlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [AlertComponent],
                declarations: [AlertComponent],
                providers: [],
            },] }
];

/*
* Public API Surface of Alert
*/

/**
 * Generated bundle index. Do not edit.
 */

export { AlertComponent, AlertModule };
//# sourceMappingURL=bite-ui-alert.js.map
