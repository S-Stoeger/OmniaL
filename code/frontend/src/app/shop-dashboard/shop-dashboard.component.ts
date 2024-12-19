import {Component, inject} from '@angular/core';
import {Reservation} from '../reservation';
import {ReservationService} from '../reservation.service';
import {NgForOf} from '@angular/common';
import {ReservationExchangeComponent} from '../reservation-exchange/reservation-exchange.component';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  imports: [
    ReservationExchangeComponent
  ],
  styleUrl: './shop-dashboard.component.css'
})
export class ShopDashboardComponent {
  requestReservations: Reservation[];
  returnReservations: Reservation[];

  reservationService: ReservationService = inject(ReservationService);

  constructor() {
    let reservations: Reservation[] = this.reservationService.getReservations();
    this.returnReservations = reservations.filter(reservation => reservation.isConfirmed);
    this.requestReservations = reservations.filter(reservation => !reservation.isConfirmed);
  }
}
