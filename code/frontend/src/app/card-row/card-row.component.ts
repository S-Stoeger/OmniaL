import {Component, inject} from '@angular/core';
import {Equipment} from '../equipment';
import {EquipmentService} from '../equipment.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-row',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.css'
})
export class CardRowComponent {
  equipment: Equipment[] = [];
  equipmentService = inject(EquipmentService);

  constructor() {
    this.equipment = this.equipmentService.getEquipment();
    console.log(this.equipment);
  }
}
