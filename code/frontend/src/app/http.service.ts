import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equipment, Person, Rental, RentalRequest} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  //local url would be 'localhost:8080/api'
  //private URL: string = 'https://it200281.cloud.htl-leonding.ac.at/api/';
  private URL: string = 'http://localhost:8080/api/';
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
    //return this.http.get<Rental[]>(this.URL + "rental/list");
    return this.http.get<Rental[]>("http://localhost:8080/api/rental/list");
  }

  postRentalDTO(rental: RentalRequest): Observable<RentalRequest> {
    console.log(rental)
    return this.http.post<RentalRequest>(`${this.URL}rental`, rental);
  }

  getEquipmentByPersonId(id: number): Observable<Equipment[]> | undefined {
    return this.http.get<Equipment[]>(`${this.URL}equipment/user/${id}`);
  }

  constructor() {
  }
}
