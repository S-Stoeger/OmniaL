import {Component, inject, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RentalEquipment} from '../rental-equipment';
import {EquipmentService} from '../equipment.service';
import {LocalStorageService} from '../local-storage.service';
import {HttpService} from '../http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AmountSettingsComponent} from '../amount-settings/amount-settings.component';
import {Equipment} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-selected-items',
  imports: [
    AmountSettingsComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css'
})
export class SelectedItemsComponent implements OnInit {
  @Input() rentalEquipment!: RentalEquipment[];
  httpService: HttpService = inject(HttpService);
  currentRentalService: LocalStorageService = inject(LocalStorageService);
  equipments = new BehaviorSubject<Equipment[]>([]);
  private snackBar = inject(MatSnackBar);
  badgeCount = 0;

  ngOnInit(): void {
    console.log(this.rentalEquipment)
    for (let rentalEquipment of this.rentalEquipment) {
      this.httpService.getEquipmentById(rentalEquipment.equipmentID).subscribe(equipment => {
        this.equipments.next([...this.equipments.getValue(), equipment])
        console.log("equipments", this.equipments);
      })
    }

    this.currentRentalService.badgeCount.subscribe((count: number) => {
      this.badgeCount = count;
    })



    console.log("Array in compontn", this.rentalEquipment);
  }

  getTime(id: number) {
    return `${this.parseDate(this.rentalEquipment.at(id)?.startTime)}-${this.parseDate(this.rentalEquipment.at(id)?.endTime)}`;
  }

  parseDate(date: String | null | undefined) {
    let re = /-/gi
    return date?.split('T')[0].replace(re, ".");
  }

  getCount(id: number) {
    return this.rentalEquipment.at(id)?.count
  }

  delete(id: number) {
    this.currentRentalService.deleteFromLocalStorage(id)
    this.equipments.next( this.equipments.getValue().filter(item => item.id !== id))
    this.snackBar.open('Gelöscht', 'Schließen');
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }
}
