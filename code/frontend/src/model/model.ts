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
