import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalEquipment } from './rental-equipment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentRentalService {
  private jsonFileUrl = 'assets/rental-equipments.json';
  equipments: RentalEquipment[] = [];

  constructor(private http: HttpClient) {}

  // Load data from the JSON file
  loadEquipments(): Observable<RentalEquipment[]> {
    return this.http.get<RentalEquipment[]>(this.jsonFileUrl);
  }

  // Add equipment
  addEquipment(equipment: RentalEquipment) {
    if (equipment) {
      this.equipments.push(equipment);
      this.saveToLocalStorage();
    }

  }

  // Update equipment
  updateEquipment(equipment: RentalEquipment) {
    const index = this.equipments.findIndex((e) => e.id === equipment.id);
    if (index !== -1) {
      this.equipments[index] = equipment;
      this.saveToLocalStorage();
    } else {
      console.error('Equipment not found!');
    }
  }

  // Delete equipment
  deleteEquipment(id: number) {
    this.equipments = this.equipments.filter((e) => e.id !== id);
    this.saveToLocalStorage();
  }

  // Save changes to localStorage
  saveToLocalStorage() {
    localStorage.setItem('rentalEquipments', JSON.stringify(this.equipments));
  }

  // Load data from localStorage (fallback)
  loadFromLocalStorage() {
    const data = localStorage.getItem('rentalEquipments');
    if (data) {
      this.equipments = JSON.parse(data);
      console.log(this.equipments);
    }
  }

  deleteFromLocalStorage(id: number) {
    let array = JSON.parse(<string>localStorage.getItem('rentalEquipments'));

    // Check if the array exists and the item to delete is in the array
    if (array) {
      // For example, remove an item with a specific id or condition
      const index = array.findIndex((item: RentalEquipment) => item.id === id);// Change this condition based on your data structure

      if (index !== -1) {
        // Remove the item from the array
        array.splice(index, 1);

        // Save the updated array back to localStorage
        localStorage.setItem('rentalEquipments', JSON.stringify(array));
      } else {
        localStorage.removeItem('rentalEquipments');
      }
    }
  }
}
