export interface Rental {
  person: Person,
  leaseDate: Date,
  returnDate: Date,
  isRented: boolean,
  isReturned: boolean,
  actualReturnDate: Date
}

export interface RentalRequest {
  personId: number,
  leaseDate: Date,
  returnDate: Date,
  equipmentIds: number[],
}

export interface RentalEquipment {
  id: number,
  equipmentID: number,
  count: number,
  startTime: string,
  endTime: string,
}


export interface Person {
  id: number,
  surname: string,
  firstname: string,
  email: string,
  grade: string,
  person_uuid: string
}

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

export interface Equipment {
  id: number
  equipmentType: string,
  labelNumber: string,
  name: string,
  title: string,
  itemCount: number,
  available: number,
  link: number
}

export interface Reservation {
  id: number;
  roomId: number;
  personId: number;
  startTime: string;
  endTime: string;
  reservationDate: string;
}

export interface ReservationDTO {
  roomId: number
  personId: number
  startTime: string
  endTime: string
  reservationDate: string;
}

export interface Model {
  reservations: Reservation[]
  persons: Person[]
}

export const model: Model = {
  reservations: [],
  persons: []
}
export interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

export interface Room {
  id: number;
  name: string;
  description: string;
}


