import {Equipment} from './equipment';

export interface Reservation {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  isConfirmed: boolean;
  equipment: {
    id: number;
    name: string;
    img: string;
  }[]
}
