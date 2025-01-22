import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {RentalEquipment} from '../rental-equipment';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
})
export class RentalComponent implements OnInit {
  constructor(public rentalService: LocalStorageService) {}

  ngOnInit() {
    // Try to load from localStorage first
    this.rentalService.loadFromLocalStorage();

    // If localStorage is empty, load from JSON file
    if (this.rentalService.equipments.length === 0) {
      this.rentalService.loadEquipments().subscribe((data: RentalEquipment[]) => {
        this.rentalService.equipments = data;
        this.rentalService.saveToLocalStorage();
      });
    }
  }
}
