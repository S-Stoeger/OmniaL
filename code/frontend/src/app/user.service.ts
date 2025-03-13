import {Injectable, OnInit} from '@angular/core';
import {Person} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Person;

  constructor() {
    //mock user since no function yet
    this.user =  {
      id: 4,
      email: "m.slabschi@students.htl-leonding.ac.at",
      firstname: "Maximilian",
      grade: "5AHITM",
      surname: "Slabschi",
      person_uuid: ""
    }
  }

  getUser(): Person {
    return this.user;
  }
}
