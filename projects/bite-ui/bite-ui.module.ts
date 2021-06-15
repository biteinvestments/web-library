import { AlertModule } from 'bite-ui/alert';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AlertModule } from 'bite-ui/alert';

@NgModule({
  imports: [
    CommonModule,
   ],
  exports: [
    AlertModule
  ],
  providers: [],
})
export class BiteUiModule {}
