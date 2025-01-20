import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Equipment, Equipment2} from './equipment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  private URL: string = 'http://localhost:8080/api/';
  equipments: Equipment[] = [];

  fetchAllVotes() {
    return this.http.get<Equipment[]>(this.URL + "equipment/list");
  }

  constructor() {

  }
}
