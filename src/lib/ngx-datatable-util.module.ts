import { NgModule } from '@angular/core';
import { NgxDatatableUtilComponent } from './ngx-datatable-util.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CommonModule } from "@angular/common";
import { SanitizeHtmlPipe } from "./pipes/sanitize-html.pipe";



@NgModule({
  declarations: [
    NgxDatatableUtilComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
  ],
  exports: [
    NgxDatatableUtilComponent
  ]
})
export class NgxDatatableUtilModule { }
