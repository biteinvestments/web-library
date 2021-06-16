import { ButtonModule } from 'bite-ui/button';
import { AlertModule } from 'bite-ui/alert';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AlertModule } from 'bite-ui/alert';

@NgModule({
  imports: [
    CommonModule,
   ],
  exports: [
    AlertModule,
    ButtonModule
  ],
  providers: [],
})
export class BiteUiModule {}
