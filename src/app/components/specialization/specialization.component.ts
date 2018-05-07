import { Component, OnInit } from '@angular/core';
import {SpecializationService} from '../../services/specialization.service';
import {Specialization} from '../../models/Specialization';

@Component({
  selector: 'specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {
  specializations: Specialization[] = [];
  selectedSpecializations: Specialization[] = [];
  constructor(private specializationService: SpecializationService) { }

  ngOnInit() {
    this.getSpecializations(true);
  }

  getSpecializations(actual: boolean): void {
    this.specializationService.getSpecializations(actual)
      .subscribe((specializations: Specialization[]) => this.specializations = specializations);
  }

  selectSpecializations(specializations: Specialization[]): void {
    this.selectedSpecializations = specializations;
    console.log(this.selectedSpecializations);
  }
}
