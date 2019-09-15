import { NgModule } from '@angular/core';
import { NgPaginatorComponent } from './ng-paginator.component';
import {FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [NgPaginatorComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [NgPaginatorComponent]
})
export class NgPaginatorModule { }
