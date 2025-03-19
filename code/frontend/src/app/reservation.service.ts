import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ReservationDTO} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationSource = new BehaviorSubject<ReservationDTO[]>([]);
  reservations = this.reservationSource.asObservable();

  addRoomReservation(roomReservation: ReservationDTO) {
    this.reservationSource.next([...this.reservationSource.value, roomReservation]);
  }

  removeRoomReservation(roomReservation: ReservationDTO) {
    const updatedReservations = this.reservationSource.value.filter(reservation => reservation.roomId === roomReservation.roomId);
  }

  getRoomById(id : number) {
    return "Fotostudio";
  }
}
