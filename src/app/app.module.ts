import { ButtonModule } from 'bite-ui/button';
// import { BiteUiModule } from './../../projects/bite-ui/bite-ui.module';
import { AlertModule } from 'bite-ui/alert';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BiteUiModule,
    AlertModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
