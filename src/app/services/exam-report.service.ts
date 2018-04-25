import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from "./file-service";

@Injectable()
export class ExamReportService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) { }

  buildExamReport(groupId: number, courseId: number): void {
      const url = `${this.documentsUrl}/exam-report/groups/${groupId}/courses/${courseId}/docx`;
      this.fileService.downloadFile(url);
  }

  buildExamReportJournalDoc(groupId: number, semester: number): void {
    const url = `${this.documentsUrl}/coursereport/groups/${groupId}/${semester}`;
    this.fileService.downloadFile(url);
  }
}
