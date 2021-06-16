import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

class ButtonComponent {
    constructor() {
        this.type = 'basic';
        this.loading = false;
        this.translate = 'access';
        this.color = '';
        this.dark = false;
        this.full = false;
        this.size = 'middle';
        this.clickEvent = new EventEmitter();
    }
    get _disabled() {
        return this.disabled || this.loading;
    }
    get classname() {
        const list = [];
        if (this.full) {
            list.push('bi-button-full');
        }
        if (this.size) {
            list.push(`bi-${this.size}-button`);
        }
        if (this.border) {
            list.push('bi-border-button');
        }
        return list.join(' ');
    }
    ngOnInit() {
    }
    handleClick(event) {
        if (this._disabled) {
            return;
        }
        this.clickEvent.emit(event);
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'bite-button',
                template: "<ng-container [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"'flat'\">\n        <button mat-flat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'stroked'\">\n        <button mat-stroked-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'raised'\">\n        <button mat-raised-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n        <button mat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n</ng-container>\n\n<ng-template #BUTTON_CONTENT>\n    <ng-container *ngIf=\"loading; else CONTENT\">\n        <span class=\"loading-icon\" [class]=\"dark ? 'dark': ''\"></span>\n    </ng-container>\n    <ng-template #CONTENT>\n        <ng-content></ng-content>\n    </ng-template>\n</ng-template>\n",
                styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.loading-icon{display:inline-block;height:16px;line-height:16px;position:relative;text-align:center;width:16px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:2px solid #fff;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:14px;left:0;margin:auto;position:absolute;right:0;top:0;width:14px}.loading-icon.dark:before{border-color:#717f86 #717f86 #717f86 transparent}.bi-large-button{height:50px}"]
            },] }
];
ButtonComponent.ctorParameters = () => [];
ButtonComponent.propDecorators = {
    type: [{ type: Input }],
    disabled: [{ type: Input }],
    loading: [{ type: Input }],
    translate: [{ type: Input }],
    color: [{ type: Input }],
    dark: [{ type: Input }],
    full: [{ type: Input }],
    size: [{ type: Input }],
    border: [{ type: Input }],
    clickEvent: [{ type: Output }]
};

class ButtonModule {
}
ButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ButtonComponent],
                exports: [ButtonComponent],
                imports: [
                    CommonModule,
                    MatButtonModule
                ]
            },] }
];

/*
* Public API Surface of Button
*/

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent, ButtonModule };
//# sourceMappingURL=bite-ui-button.js.map
