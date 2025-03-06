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
