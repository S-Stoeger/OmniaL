import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Reservation} from '../reservation';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {HttpService} from '../http.service';
import {Rental} from '../rental';

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
  @Input() hasBeenRented!: boolean;
  @Output() close = new EventEmitter<void>();
  isModalOpen: boolean = false;
  modalRental: Rental | null = null;
  httpService: HttpService = inject(HttpService);
  rentals: Rental[] = [];

  constructor() {
    this.httpService.getAllRentals().subscribe((res: any) => {
      this.rentals = res;
      this.rentals = this.rentals.filter(r => r.returned === this.hasBeenRented);
    });
  }

  openModal(rental: Rental) {
    this.isModalOpen = true;
    this.modalRental = rental;
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
