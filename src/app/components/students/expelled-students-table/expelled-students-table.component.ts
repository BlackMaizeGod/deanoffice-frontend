import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentDegree} from '../../../models/StudentDegree';
import {defaultColDef, expelledColumnDefs, LOCALE_TEXT} from '../constants';
import {PaymentFilterComponent} from '../payment-filter/payment-filter.component';

@Component({
  selector: 'expelled-students-table',
  templateUrl: './expelled-students-table.component.html',
  styleUrls: ['./expelled-students-table.component.scss']
})
export class ExpelledStudentsTableComponent {
  @Input() rows: StudentDegree[] = [];
  @Output() selectionChanged = new EventEmitter();
  @Output() modelUpdated = new EventEmitter();
  private gridApi;
  private gridColumnApi;
  columnDefs = expelledColumnDefs;
  defaultColDef = defaultColDef;
  localeText = LOCALE_TEXT;
  frameworkComponents;
  getRowNodeId = (data) => data.id;

  constructor() {
    this.frameworkComponents = {
      paymentFilter: PaymentFilterComponent
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selected = this.gridApi.getSelectedRows();
    this.selectionChanged.emit(selected)
  }

  onModelUpdated(params) {
    const count = params.api.getDisplayedRowCount();
    this.modelUpdated.emit(count);
  }

  onRenew(forRenew) {
    this.gridApi.updateRowData({ remove: forRenew });
  }

  showByIndex(index) {
    if (index !== -1) {
      this.gridApi.ensureIndexVisible(index, 'top');
      const node = this.gridApi.getRowNode(this.rows[index].id);
      node.setSelected(true, true);
    }
  }
}
