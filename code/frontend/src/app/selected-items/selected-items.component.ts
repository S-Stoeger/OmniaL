import {Component, inject, Input} from '@angular/core';
import {Reservation} from '../reservation';
import {NgForOf} from '@angular/common';
import {RentalEquipment} from '../rental-equipment';
import {EquipmentService} from '../equipment.service';
import {Equipment} from '../equipment';
import {CurrentRentalService} from '../current-rental.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-selected-items',
  imports: [
    NgForOf
  ],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css'
})
export class SelectedItemsComponent {
  @Input() rentalEquipment!: RentalEquipment[];
  httpService: HttpService = inject(HttpService);
  currentRentalService: CurrentRentalService = inject(CurrentRentalService);
  equipments: Equipment[] = [];


  ngOnInit(): void {
    console.log(this.rentalEquipment)
    for (let i = 0; i < this.rentalEquipment.length; i++) {
      this.httpService.getEquipmentById(this.rentalEquipment[i].equipmentID).subscribe(equipment => {
        this.equipments.push(equipment);
      })
    }
  }

  getTime(id: number) {
    return `${this.parseDate(this.rentalEquipment.at(id)?.startTime)}-${this.parseDate(this.rentalEquipment.at(id)?.endTime)}`;
  }

  parseDate(date: String | null | undefined) {
    let re = /-/gi
    return date?.split('T')[0].replace(re, ".");
  }

  getCount(id: number) {
    return `${this.rentalEquipment.at(id)?.count}`
  }
}
