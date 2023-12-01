package at.htlleonding.omnial.reservation;

import at.htlleonding.omnial.person.Person;
import at.htlleonding.omnial.person.PersonRepository;
import at.htlleonding.omnial.room.Room;
import at.htlleonding.omnial.room.RoomRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ReservationMapper {
    @Inject
    PersonRepository personRepository;

    @Inject
    RoomRepository roomRepository;

    public ReservationDTO toDTO(Reservation reservation){
        Person person = reservation.getPerson();
        Room room = reservation.getRoom();

        return new ReservationDTO(room.getId() ,person.getId(), reservation.getStartTime(), reservation.getEndTime(), reservation.getReservationDate());
    }

    public Reservation toEntity(ReservationDTO reservationDTO){
        Person person = personRepository.getById(reservationDTO.personId());
        Room room = roomRepository.getRoomById(reservationDTO.roomId());
        return new Reservation(room,person,reservationDTO.startTime(),reservationDTO.endTime(),reservationDTO.reservationDate());
    }


}
