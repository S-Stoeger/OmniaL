import {Component, inject, OnInit} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {LocalStorageService} from '../local-storage.service';
import {RentalEquipment} from '../rental-equipment';
import {HttpService} from '../http.service';
import {Person} from '../person';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RentalRequest} from '../interfaces';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  imports: [
    SelectedItemsComponent
  ],
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent implements OnInit {
  rental: RentalEquipment[] = [];
  rentalService: LocalStorageService = inject(LocalStorageService)
  httpService: HttpService = inject(HttpService)
  localStorageService: LocalStorageService = inject(LocalStorageService)
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.rentalService.warenkorb.subscribe((res: any) => {
      this.rental = res;
    })
  }

  ngOnInit() {
      this.rentalService.loadFromLocalStorage()
  }

  addReservation() {
    const person: Person = {
      id: 5,
      person_uuid: '92874a0d-a3d6-4729-aee7-2cf92a6162ca',
      surname: 'Wagner',
      firstname: 'Moritz',
      email: 'moritz.wagner06@gmx.at',
      grade: '5AHITM'
    };

    const equipmentIds: number[] = this.rental.map(item => item.equipmentID);

    const rentalsRequest: RentalRequest = {
      personId: person.id,
      leaseDate: new Date("2023-11-15T19:00:00.000+00:00"),
      returnDate: new Date("2023-11-15T19:00:00.000+00:00"),
      equipmentIds: equipmentIds
    };

    this.httpService.postRentalDTO(rentalsRequest).subscribe((res: any) => {})
    this.localStorageService.clearStorage()

    this.snackBar.open('Reserviert', 'Schließen')
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }

}
