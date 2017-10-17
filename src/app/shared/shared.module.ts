import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CurrencyPipe } from '@angular/common';

import { VideoRecordComponent } from './video-record/video-record.component';
import { MaterialModule } from "../material/material.module";

import { AjaxService } from "./ajax-api/ajax.service";
import { JsonApiService } from "./ajax-api/json-api.service";
import { WebStorageService } from "./ajax-api/web-storage.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    VideoRecordComponent
  ],
  exports: [
    VideoRecordComponent
  ],
  providers:[
    AjaxService,
    JsonApiService,
    WebStorageService,
    CookieService,
    CurrencyPipe
  ]
})
export class SharedModule { }
