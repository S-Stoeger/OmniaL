import {Component, inject, Input} from '@angular/core';
import {ReservationDTO} from '../interfaces';
import {ReservationService} from '../reservation.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-room-item',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.css'
})
export class RoomItemComponent {
  @Input() rooms!: ReservationDTO[];
  reservationService: ReservationService = inject(ReservationService);
}
