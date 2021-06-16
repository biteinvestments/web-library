import { ButtonModule } from 'bite-ui/button';
import { AlertModule } from 'bite-ui/alert';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AlertModule } from 'bite-ui/alert';
class BiteUiModule {
}
BiteUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                exports: [
                    AlertModule,
                    ButtonModule
                ],
                providers: [],
            },] }
];

// index.ts

/**
 * Generated bundle index. Do not edit.
 */

export { BiteUiModule };
//# sourceMappingURL=bite-ui.js.map
