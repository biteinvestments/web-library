(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bite-ui/button'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('bite-ui', ['exports', 'bite-ui/button', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['bite-ui'] = {}, global['bite-ui'].button, global.ng.core, global.ng.common));
}(this, (function (exports, button, core, common) { 'use strict';

    var BiteUiModule = /** @class */ (function () {
        function BiteUiModule() {
        }
        return BiteUiModule;
    }());
    BiteUiModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                    ],
                    exports: [
                        button.ButtonModule
                    ],
                    providers: [],
                },] }
    ];

    // index.ts

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BiteUiModule = BiteUiModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bite-ui.umd.js.map
