import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GroupComponent} from '../group/group.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {HttpClientModule} from '@angular/common/http';
import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {AppRoutingModule} from '../../routes/routes';
import {FormsModule} from '@angular/forms';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {GridModule} from '../grid/grid.module';
import {ExamReportComponent} from '../exam-report/exam-report.component';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    SpecialityComponent,
    DiplomaSupplementComponent,
    ExamReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule
  ],
  providers: [
    DegreeService,
    GroupService,
    StudentService,
    DiplomaSupplementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
