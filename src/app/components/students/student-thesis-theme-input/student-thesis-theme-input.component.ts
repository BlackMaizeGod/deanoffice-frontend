import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ThesisInputService} from '../../../services/thesis-input.service';
import {ThesisByGroups} from '../../../models/thesis-theme-models/ThesisByGroups';
import {MissingThesisDataRed} from '../../../models/thesis-theme-models/MissingThesisDataRed';
import {StudentDegreeFullEdeboData} from '../../../models/synchronization-edebo-models/StudentDegreeFullEdeboData';
import {ImportedThesisData} from '../../../models/thesis-theme-models/ImportedThesisData';

@Component({
  selector: 'student-thesis-theme-input',
  templateUrl: './student-thesis-theme-input.component.html',
  styleUrls: ['./student-thesis-theme-input.component.scss']
})
export class StudentThesisThemeInputComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  fileName = 'Виберіть файл';
  modalName = 'Тема диплому';
  selectedFile: File = null;
  wrongExtension = false;
  uploadInProgress = false;
  resultView = false;
  fileField = true;
  modalSize = '';
  downloadButton = true;
  saveButton = false;
  tableView = false;
  listThesisDataForGroup: ThesisByGroups[];
  missingThesisDataRed: MissingThesisDataRed[];
  updatedStudentDegrees: number;
  notUpdatedStudentDegrees: string[];

  constructor(private thesisService: ThesisInputService) {
  }

  ngOnInit() {
  }

  private checkExtension(file): boolean {
    const extension = file.name.slice(file.name.lastIndexOf('.'));
    return !(extension === '.docx' || extension === '.doc');
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.wrongExtension = this.checkExtension(this.selectedFile);
    this.fileName = this.selectedFile.name;
  }

  onFileUpload() {
    this.fileField = false;
    this.uploadInProgress = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.thesisService.uploadFile(formData).subscribe(
      res => {
        this.listThesisDataForGroup = res.listThesisDataForGroupDTOs;
        this.missingThesisDataRed = res.missingThesisDataRedDTOs;
        this.uploadInProgress = false;
        this.downloadButton = false;
        this.changeModal();
      }
    );
  }

  isNotUpdatedThesisTheme() {
    return this.notUpdatedStudentDegrees.length !== 0 && this.notUpdatedStudentDegrees !== null;
  }

  changeModal() {
    this.modalSize = 'modal-full';
    this.tableView = true;
  }

  hideModal() {
    this.modal.hide();

    setTimeout(() => {
      this.tableView = false;
      this.saveButton = false;
      this.modalSize = '';
      this.resultView = false;
    }, 500);
  }

  saveChanges() {
    const thesisDataForSaveDTOs = this.getSelectedStudents();
    this.thesisService.updateData(thesisDataForSaveDTOs).subscribe(
      response => {
        this.notUpdatedStudentDegrees = response.notUpdatedStudentDegrees;
        this.updatedStudentDegrees = response.updatedStudentDegrees;
        this.modalSize = '';
        this.modalName = 'Дані змінено';
        this.tableView = !this.tableView;
        this.resultView = true;
      }
    );
    this.saveButton = true;
  }

  onAllThesisThemeSelected(checked: boolean, index: number) {
    for (const student of this.listThesisDataForGroup[index].thesisDataBeans) {
      student.selected = checked;
    }
  }

  private getSelectedStudents() {
    return this.listThesisDataForGroup
      .map(group => group.thesisDataBeans.filter(student => student.selected))
      .reduce((prev, curr) => prev.concat(curr))
      .map(student => {
        return {
          studentFullName: student.fullName,
          studentDegreeId: student.id,
          thesisName: student.thesisName,
          thesisNameEng: student.thesisNameEng,
          thesisSupervisor: student.fullSupervisorName
        }
      });
  }

  onShow() {
    this.fileName = 'Виберіть файл';
    this.fileField = true;
    this.downloadButton = true;
    this.modal.show();
  }
}
