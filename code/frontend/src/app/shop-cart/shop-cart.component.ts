import {Component, inject, OnInit} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {LocalStorageService} from '../local-storage.service';
import {HttpService} from '../http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person, RentalEquipment, RentalRequest} from '../interfaces';
import {UserService} from '../user.service';

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
  userService: UserService = inject(UserService);
  localStorageService: LocalStorageService = inject(LocalStorageService)
  private snackBar = inject(MatSnackBar);
  user: Person;

  constructor() {
    this.rentalService.warenkorb.subscribe((res: any) => {
      this.rental = res;
    })

    this.user = this.userService.getUser()
  }

  ngOnInit() {
      this.rentalService.loadFromLocalStorage();
  }

  addReservation() {
    const equipmentIds: number[] = this.rental.map(item => item.equipmentID);

    const rentalsRequest: RentalRequest = {
      personId: this.user.id,
      leaseDate: new Date(this.rental[0].startTime),
      returnDate: new Date(this.rental[0].endTime),
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
