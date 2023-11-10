package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ReservationRepository {

    @Inject
    private EntityManager entityManager;

    public List<Reservation> getAllReservation() {
        return this.entityManager.createQuery("select r from Reservation r").getResultList();
    }

    public void addReservation(Reservation reservation){
        this.entityManager.persist(reservation);
    }

}
