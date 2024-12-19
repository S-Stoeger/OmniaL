import {Component, Input} from '@angular/core';
import {Reservation} from '../reservation';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-reservation-exchange',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './reservation-exchange.component.html',
  styleUrl: './reservation-exchange.component.css'
})
export class ReservationExchangeComponent {
  @Input() reservations!: Reservation[];

  constructor() {
    console.log(this.reservations)
  }
}
