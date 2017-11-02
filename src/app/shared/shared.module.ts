import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { VideoRecordComponent } from './video-record/video-record.component';
import { MaterialModule } from "../material/material.module";

import { AjaxService } from "./ajax-api/ajax.service";
import { JsonApiService } from "./ajax-api/json-api.service";
import { WebStorageService } from "./ajax-api/web-storage.service";
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';
import { TimeLineComponent } from './time-line/time-line.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    VideoRecordComponent,
    FileInputComponent,
    ByteFormatPipe,
    TimeLineComponent
  ],
  exports: [
    VideoRecordComponent,
    FileInputComponent,
    ByteFormatPipe,
    TimeLineComponent
  ],
  providers:[
    AjaxService,
    JsonApiService,
    WebStorageService,
    CookieService,
    CurrencyPipe,
    ByteFormatPipe,
    DatePipe
  ]
})
export class SharedModule { }
