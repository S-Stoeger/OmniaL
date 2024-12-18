import {Component, inject} from '@angular/core';
import {Eqipment} from '../eqipment';
import {EqipmentService} from '../eqipment.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-card-row',
  imports: [
    NgForOf
  ],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.css'
})
export class CardRowComponent {
  equipment: Eqipment[] = [];
  equipmentService = inject(EqipmentService);

  constructor() {
    this.equipment = this.equipmentService.getEquipment();
    console.log(this.equipment);
  }
}
