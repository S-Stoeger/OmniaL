package at.htlleonding.omnial.mapper;

import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.model.Reservation;
import at.htlleonding.omnial.model.ReservationDTO;
import at.htlleonding.omnial.repository.PersonRepository;
import at.htlleonding.omnial.model.Room;
import at.htlleonding.omnial.repository.RoomRepository;
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

        return new ReservationDTO(reservation.getId(),room.getId() ,person.getId(), reservation.getStartTime(), reservation.getEndTime(), reservation.getReservationDate());
    }

    public Reservation toEntity(ReservationDTO reservationDTO){
        Person person = personRepository.getById(reservationDTO.personId());
        Room room = roomRepository.getRoomById(reservationDTO.roomId());
        return new Reservation(reservationDTO.id(), room,person,reservationDTO.startTime(),reservationDTO.endTime(),reservationDTO.reservationDate());
    }

}
