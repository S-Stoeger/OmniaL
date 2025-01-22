import {Person} from './person';

export interface Rental {
  person: Person,
  date: Date,
  isReturned: boolean
}
