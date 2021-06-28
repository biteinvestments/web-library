import { ButtonModule } from 'bite-ui/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
   ],
  exports: [
    ButtonModule
  ],
  providers: [],
})
export class BiteUiModule {}
