import {Component, inject, Input, OnInit} from '@angular/core';
import {Equipment, Equipment2} from '../equipment';
import {EquipmentService} from '../equipment.service';
import {NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HttpService} from '../http.service';

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
export class CardRowComponent implements OnInit {
  @Input() rowCount!: number;
  httpService: HttpService = inject(HttpService);

  equipment: Equipment[] = [];
  equipmentService = inject(EquipmentService);
  test: Equipment[] = [];

  ngOnInit() {
    this.httpService.fetchAllVotes().subscribe(
      t => {
        this.test = t;
        console.log(t)
      }
    );

  }

  constructor() {
    this.equipment = this.equipmentService.getEquipment();
  }
}
