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

export interface Person {
    id: number;
    surname: String;
    firstname: String;
    email: String;
    grade: String;
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