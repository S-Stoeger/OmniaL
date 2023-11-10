package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public String getReservationsFromFile(){
        String reservationString = "";
        Path filepath = Paths.get("../../../../../../../data/reservations.json");
        try {
            reservationString = Files.readString(filepath);
        }
        catch (Exception ex){
            System.out.println("Error happened while reading reservations");
        }
        return reservationString;
    }

}
