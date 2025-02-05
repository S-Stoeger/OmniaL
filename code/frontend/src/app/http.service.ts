import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Equipment} from './equipment';
import {Observable} from 'rxjs';
import {RentalDTO} from './rental-dto';
import {Rental} from './rental';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  //local url would be 'localhost:8080/api'
  private URL: string = 'https://it200281.cloud.htl-leonding.ac.at/api/';
  equipments: Equipment[] = [];

  // Get all equipments
  fetchAllVotes() {
    return this.http.get<Equipment[]>(this.URL + "equipment/list");
  }

  // Get Equipments by ID
  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.URL}equipment/${id}`);
  }

  // Get all rentals
  getAllRentals() {
    return this.http.get<Rental[]>(this.URL + "rental/list");
  }

  // Post rental
  postRentalDTO(rental: Rental, rentalDTO: RentalDTO) {
    this.http.post<RentalDTO>(`${this.URL}rental`, {rental, rentalDTO});
  }

  constructor() {
  }
}
