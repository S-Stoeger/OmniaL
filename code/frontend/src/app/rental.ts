import {Person} from './person';

export interface Rental {
  person: Person,
  date: Date,
  returned: boolean
}
