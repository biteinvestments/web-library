import { ButtonModule } from 'bite-ui/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class BiteUiModule {
}
BiteUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                exports: [
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
