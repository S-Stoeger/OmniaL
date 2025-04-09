import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Equipment, ReservationDTO} from '../interfaces';
import {HttpService} from '../http.service';
import {RoomItemComponent} from '../room-item/room-item.component';
import {ReservationService} from '../reservation.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    NgForOf,
    RoomItemComponent
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  tableHeaders: string[] =  ["Img", "Name", "Typ", "Anzahl"]
  tableEquipment: Equipment[] = [];
  httpService: HttpService = inject(HttpService);
  reservationService: ReservationService = inject(ReservationService);
  reservations: ReservationDTO[] = [];

  ngOnInit() {
    this.httpService.getEquipmentById(1).subscribe(r => {
      this.tableEquipment.push(r)
    })

    this.reservationService.reservations.subscribe(reservation => {
      this.reservations = reservation;
    })
  }
}
