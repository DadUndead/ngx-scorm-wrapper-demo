import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScormWrapperModule } from 'ngx-scorm-wrapper';

import { AppComponent } from './app.component';
import { LmsService } from './lms.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScormWrapperModule,
  ],
  providers: [
    LmsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
