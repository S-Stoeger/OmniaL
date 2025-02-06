import {Person} from './person';

export interface Rental {
  person: Person,
  leaseDate: Date,
  returnDate: Date,
  rented: boolean,
  returned: boolean
}
