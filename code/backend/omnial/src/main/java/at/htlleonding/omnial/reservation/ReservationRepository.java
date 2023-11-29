package at.htlleonding.omnial.reservation;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

@ApplicationScoped
public class ReservationRepository {

    @Inject
    EntityManager entityManager;

    public Reservation findByIdRervation(int id){
        Reservation reservation = entityManager.find(Reservation.class, id);
        if (reservation == null){
            throw new NotFoundException();
        }
        return reservation;
    }

    public List<Reservation> getAllReservations(){
        return entityManager.createNamedQuery(Reservation.FIND_ALL_RESERVATIONS, Reservation.class).getResultList();
    }

    @Transactional
    public void addReservation(Reservation reservation){
        if (findByIdRervation(reservation.getId()) == null){
            entityManager.persist(reservation);
        }
    }

    @Transactional
    public void deleteReservation(int id){
        Reservation reservation = findByIdRervation(id);
        entityManager.remove(reservation);
    }

    @Transactional
    public void updateReservation(int id, Reservation reservation){
        Reservation oldReservation = findByIdRervation(id);
        oldReservation.setReservationDate(reservation.getReservationDate());
        oldReservation.setPerson(reservation.getPerson());
        oldReservation.setRoom(reservation.getRoom());
        oldReservation.setEndTime(reservation.getEndTime());
        oldReservation.setStartTime(reservation.getStartTime());
    }






}