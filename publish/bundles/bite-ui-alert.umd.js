(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('bite-ui/alert', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['bite-ui'] = global['bite-ui'] || {}, global['bite-ui'].alert = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var AlertComponent = /** @class */ (function () {
        function AlertComponent() {
            // Alert 类型
            this.type = 'info';
            // 是否显示图标，用于支持用户自定义图标
            this.showIcon = true;
            // 是否可关闭
            this.closeable = false;
            // 关闭回调
            this.closeEvent = new core.EventEmitter();
            this.hide = false;
        }
        AlertComponent.prototype.ngOnInit = function () {
        };
        AlertComponent.prototype.close = function () {
            this.closeEvent.emit(true);
            this.hide = true;
        };
        return AlertComponent;
    }());
    AlertComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bite-alert',
                    template: "<!-- This is an useless demo -->\n<div class=\"bite-alert {{ type }} \" *ngIf=\"!hide\">\n  This is an useless demo\n  <span class=\"bite-alert-icon icon-{{ type }}\" *ngIf=\"showIcon\"></span>\n  \u3010<ng-content></ng-content>\u3011\n\n  <button type=\"button\" class=\"bite-close\" (click)=\"close()\" *ngIf=\"closeable\">Close</button>\n</div>\n",
                    styles: [".bite-alert{background-color:rgba(37,159,215,.08);padding:20px}"]
                },] }
    ];
    AlertComponent.ctorParameters = function () { return []; };
    AlertComponent.propDecorators = {
        type: [{ type: core.Input }],
        showIcon: [{ type: core.Input }],
        closeable: [{ type: core.Input }],
        closeEvent: [{ type: core.Output }]
    };

    var AlertModule = /** @class */ (function () {
        function AlertModule() {
        }
        return AlertModule;
    }());
    AlertModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
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

    exports.AlertComponent = AlertComponent;
    exports.AlertModule = AlertModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bite-ui-alert.umd.js.map
