import { Injectable } from '@angular/core';
import {Reservation} from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: Reservation[] = [
    {
      id: 1,
      name: "John Doe",
      startDate: new Date("2024-12-20T10:00:00"),
      endDate: new Date("2024-12-25T18:00:00"),
      isConfirmed: true,
      equipment: [
        {
          id: 1,
          name: "Panasonic Lumix DCM-GH4",
          img: "./assets/images/gh4.jpg",
        },
        {
          id: 4,
          name: "Dji Ronin M",
          img: "./assets/images/roninM.png",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      startDate: new Date("2024-12-22T09:00:00"),
      endDate: new Date("2024-12-23T17:00:00"),
      isConfirmed: false,
      equipment: [
        {
          id: 2,
          name: "Panasonic Lumix DCM-GH6",
          img: "./assets/images/gh6.png",
        },
        {
          id: 8,
          name: "Sigma 18-35mm",
          img: "./assets/images/objektiv.png",
        },
      ],
    },
    {
      id: 3,
      name: "Michael Brown",
      startDate: new Date("2024-12-24T14:00:00"),
      endDate: new Date("2024-12-30T16:00:00"),
      isConfirmed: true,
      equipment: [
        {
          id: 3,
          name: "Blackmagic Cinema Pocket",
          img: "./assets/images/blackmagic.png",
        },
        {
          id: 7,
          name: "Atomos Ninja Inferno",
          img: "./assets/images/ninjaMonitor.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Emily Davis",
      startDate: new Date("2024-12-18T08:00:00"),
      endDate: new Date("2024-12-19T20:00:00"),
      isConfirmed: false,
      equipment: [
        {
          id: 6,
          name: "Kamera",
          img: "./assets/images/camera.png",
        },
        {
          id: 5,
          name: "Dji Ronin S",
          img: "./assets/images/roninS.png",
        },
      ],
    },
  ];

  getReservations(): Reservation[] {
    return this.reservations;
  }
}
