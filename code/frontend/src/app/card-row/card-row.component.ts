import {Component, inject, Input} from '@angular/core';
import {Equipment} from '../equipment';
import {EquipmentService} from '../equipment.service';
import {NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-row',
  imports: [
    NgForOf,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.css'
})
export class CardRowComponent {
  @Input() rowCount!: number;

  equipment: Equipment[] = [];
  equipmentService = inject(EquipmentService);

  constructor() {
    this.equipment = this.equipmentService.getEquipment();
  }
}
