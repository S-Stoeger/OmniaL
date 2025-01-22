import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Reservation} from '../reservation';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';

@Component({
  selector: 'app-reservation-exchange',
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
  ],
  templateUrl: './reservation-exchange.component.html',
  styleUrl: './reservation-exchange.component.css'
})
export class ReservationExchangeComponent {
  @Input() reservations!: Reservation[];
  @Output() close = new EventEmitter<void>();
  isModalOpen: boolean = false;
  modalReservation: Reservation | null = null;

  constructor() {
  }

  openModal(reservation: Reservation) {
    this.isModalOpen = true;
    this.modalReservation = reservation;
  }

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
