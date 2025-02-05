import {Component, inject, Input, OnInit} from '@angular/core';
import {Reservation} from '../reservation';
import {NgForOf, NgIf} from '@angular/common';
import {RentalEquipment} from '../rental-equipment';
import {EquipmentService} from '../equipment.service';
import {Equipment} from '../equipment';
import {LocalStorageService} from '../local-storage.service';
import {HttpService} from '../http.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-selected-items',
  imports: [
    NgForOf,
  ],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css'
})
export class SelectedItemsComponent implements OnInit {
  @Input() rentalEquipment!: RentalEquipment[];
  httpService: HttpService = inject(HttpService);
  currentRentalService: LocalStorageService = inject(LocalStorageService);
  equipments: Equipment[] = [];
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
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

  delete(id: number) {
    this.currentRentalService.deleteFromLocalStorage(id)
    this.equipments = this.equipments.filter(item => item.id !== id);
    this.snackBar.open('Gelöscht', 'Schließen');
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }
}
