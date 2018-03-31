import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {SharedModule} from '../shared/shared.module';
import {AddStudentComponent} from './add-student/add-student.component';
import {StudentTypeaheadComponent} from './student-typeahead/student-typeahead.component';
import {StudentsFiltersComponent} from './students-filters/students-filters.component';
import {StudentsSearchComponent} from './students-search/students-search.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
    AddStudentComponent,
    StudentTypeaheadComponent,
    StudentsFiltersComponent,
    StudentsSearchComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
  ],
})

export class StudentsModule {
}