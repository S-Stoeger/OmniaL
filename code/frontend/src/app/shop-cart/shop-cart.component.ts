import {Component, inject, OnInit} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {LocalStorageService} from '../local-storage.service';
import {RentalEquipment} from '../rental-equipment';
import {Observable} from 'rxjs';
import {HttpService} from '../http.service';
import {RentalDTO} from '../rental-dto';
import {Rental} from '../rental';
import {Person} from '../person';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    const rentalsDTO: RentalDTO[] = this.rental.map(({id, equipmentID}) => ({
      rentalId: id,
      equipmentId: equipmentID,
      isReturned: false
    }))

    const person: Person = {
      id: 5,
      person_uuid: '92874a0d-a3d6-4729-aee7-2cf92a6162ca',
      surname: 'Wagner',
      firstname: 'Moritz',
      email: 'moritz.wagner06@gmx.at',
      grade: '5AHITM'
    }

    const rentalOriginal: Rental = {
      person: person,
      date: new Date("2023-11-15T19:00:00.000+00:00"),
      returned: false
    }

    rentalsDTO.forEach((res: RentalDTO) => {
      this.httpService.postRentalDTO(rentalOriginal, res)
    })

    this.snackBar.open('Reserviert', 'Schließen')
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }

}
