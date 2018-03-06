import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalModule} from 'ngx-bootstrap';

import {ModalComponent} from './modal/modal.component';
import {EntriesPipe} from '../../pipes/entries.pipe';
import {SidebarComponent} from '../app/sidebar/sidebar.component';

@NgModule({
  declarations: [
    EntriesPipe,
    ModalComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ModalModule,
    NgxDatatableModule,
    EntriesPipe,
    ModalComponent,
    SidebarComponent,
  ]
})

export class SharedModule {
}
