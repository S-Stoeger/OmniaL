import {Component, inject} from '@angular/core';
import {ReservationService} from '../reservation.service';
import {NgForOf} from '@angular/common';
import {ReservationExchangeComponent} from '../reservation-exchange/reservation-exchange.component';
import {HttpService} from '../http.service';
import {Reservation} from '../interfaces';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  imports: [
    ReservationExchangeComponent
  ],
  styleUrl: './shop-dashboard.component.css'
})
export class ShopDashboardComponent {

  constructor() {

  }


}
