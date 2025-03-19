import {Component, inject, OnInit} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {LocalStorageService} from '../local-storage.service';
import {HttpService} from '../http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person, RentalEquipment, RentalRequest, ReservationDTO} from '../interfaces';
import {UserService} from '../user.service';
import {ReservationService} from '../reservation.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  imports: [
    SelectedItemsComponent,
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent implements OnInit {
  rental: RentalEquipment[] = [];
  reservations: ReservationDTO[] = [];

  rentalService: LocalStorageService = inject(LocalStorageService)
  httpService: HttpService = inject(HttpService)
  userService: UserService = inject(UserService);
  reservationService: ReservationService = inject(ReservationService);
  localStorageService: LocalStorageService = inject(LocalStorageService)
  router = inject(Router)
  private snackBar = inject(MatSnackBar);
  user: Person | null = null;
  rooms: ReservationDTO[] = [];

  constructor() {
    this.rentalService.warenkorb.subscribe((res: any) => {
      this.rental = res;
    })
    this.reservationService.reservations.subscribe((res: any) => {
      this.reservations = res;
    })

    this.userService.user$.subscribe(u => this.user = u );

    this.rooms = this.localStorageService.getRoomDTO()
    console.log("hallo")
    console.log(this.rooms)
  }

  ngOnInit() {
      this.rentalService.loadFromLocalStorage();
  }

  addReservation() {
    const equipmentIds: number[] = this.rental.map(item => item.equipmentID);

    const rentalsRequest: RentalRequest = {
      personId: this.user!.id,
      leaseDate: new Date(this.rental[0].startTime),
      returnDate: new Date(this.rental[0].endTime),
      equipmentIds: equipmentIds
    };

    console.log("moin")
    console.log(this.user)

    this.httpService.postRentalDTO(rentalsRequest).subscribe((res: any) => {})
    this.localStorageService.clearStorage()

    this.snackBar.open('Reserviert', 'Schließen')
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }

  addRoom() {
    this.router.navigate(['room']);
  }
}
