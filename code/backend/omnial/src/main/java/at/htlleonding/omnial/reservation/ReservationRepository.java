package at.htlleonding.omnial.reservation;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

@ApplicationScoped
public class ReservationRepository {

    @Inject
    EntityManager entityManager;

    public Reservation findByIdReservation(int id){
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
       if (!checkReservation(reservation)) {
         throw new BadRequestException();
       }
       entityManager.persist(reservation);
    }

    @Transactional
    public void deleteReservation(int id){
        Reservation reservation = findByIdReservation(id);
        entityManager.remove(reservation);
    }

    @Transactional
    public void updateReservation(int id, Reservation reservation){
        Reservation oldReservation = findByIdReservation(id);
        oldReservation.setReservationDate(reservation.getReservationDate());
        oldReservation.setPerson(reservation.getPerson());
        oldReservation.setRoom(reservation.getRoom());
        oldReservation.setEndTime(reservation.getEndTime());
        oldReservation.setStartTime(reservation.getStartTime());
    }

    public boolean checkReservation(Reservation reservation){

        for (Reservation currRes: getAllReservations()) {
            //checks if reservation is between another reservation
            if(reservation.getStartTime().isAfter(currRes.getStartTime()) && reservation.getStartTime().isBefore(currRes.getEndTime())){
                return false;
            }
            else if (reservation.getEndTime().isAfter(currRes.getStartTime()) && reservation.getEndTime().isBefore(currRes.getEndTime())){
                return false;
            }

            else if(currRes.getStartTime().isAfter(reservation.getStartTime()) && currRes.getStartTime().isBefore(reservation.getEndTime())){
                return false;
            }
            else if (currRes.getEndTime().isAfter(reservation.getStartTime()) && currRes.getEndTime().isBefore(reservation.getEndTime())){
                return false;
            }
            else if(reservation.getEndTime().isEqual(currRes.getEndTime() )|| reservation.getStartTime().isEqual(currRes.getStartTime())){
                return false;
            }
        }
        return true;

    }




}