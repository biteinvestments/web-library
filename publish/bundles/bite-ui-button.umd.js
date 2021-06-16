(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/button')) :
    typeof define === 'function' && define.amd ? define('bite-ui/button', ['exports', '@angular/core', '@angular/common', '@angular/material/button'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['bite-ui'] = global['bite-ui'] || {}, global['bite-ui'].button = {}), global.ng.core, global.ng.common, global.ng.material.button));
}(this, (function (exports, core, common, button) { 'use strict';

    var ButtonComponent = /** @class */ (function () {
        function ButtonComponent() {
            this.type = 'basic';
            this.loading = false;
            this.translate = 'access';
            this.color = '';
            this.dark = false;
            this.full = false;
            this.size = 'middle';
            this.clickEvent = new core.EventEmitter();
        }
        Object.defineProperty(ButtonComponent.prototype, "_disabled", {
            get: function () {
                return this.disabled || this.loading;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonComponent.prototype, "classname", {
            get: function () {
                var list = [];
                if (this.full) {
                    list.push('bi-button-full');
                }
                if (this.size) {
                    list.push("bi-" + this.size + "-button");
                }
                if (this.border) {
                    list.push('bi-border-button');
                }
                return list.join(' ');
            },
            enumerable: false,
            configurable: true
        });
        ButtonComponent.prototype.ngOnInit = function () {
        };
        ButtonComponent.prototype.handleClick = function (event) {
            if (this._disabled) {
                return;
            }
            this.clickEvent.emit(event);
        };
        return ButtonComponent;
    }());
    ButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bite-button',
                    template: "<ng-container [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"'flat'\">\n        <button mat-flat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'stroked'\">\n        <button mat-stroked-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'raised'\">\n        <button mat-raised-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n        <button mat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n</ng-container>\n\n<ng-template #BUTTON_CONTENT>\n    <ng-container *ngIf=\"loading; else CONTENT\">\n        <span class=\"loading-icon\" [class]=\"dark ? 'dark': ''\"></span>\n    </ng-container>\n    <ng-template #CONTENT>\n        <ng-content></ng-content>\n    </ng-template>\n</ng-template>\n",
                    styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.loading-icon{display:inline-block;height:16px;line-height:16px;position:relative;text-align:center;width:16px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:2px solid #fff;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:14px;left:0;margin:auto;position:absolute;right:0;top:0;width:14px}.loading-icon.dark:before{border-color:#717f86 #717f86 #717f86 transparent}.bi-large-button{height:50px}"]
                },] }
    ];
    ButtonComponent.ctorParameters = function () { return []; };
    ButtonComponent.propDecorators = {
        type: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        loading: [{ type: core.Input }],
        translate: [{ type: core.Input }],
        color: [{ type: core.Input }],
        dark: [{ type: core.Input }],
        full: [{ type: core.Input }],
        size: [{ type: core.Input }],
        border: [{ type: core.Input }],
        clickEvent: [{ type: core.Output }]
    };

    var ButtonModule = /** @class */ (function () {
        function ButtonModule() {
        }
        return ButtonModule;
    }());
    ButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ButtonComponent],
                    exports: [ButtonComponent],
                    imports: [
                        common.CommonModule,
                        button.MatButtonModule
                    ]
                },] }
    ];

    /*
    * Public API Surface of Button
    */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ButtonComponent = ButtonComponent;
    exports.ButtonModule = ButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bite-ui-button.umd.js.map
