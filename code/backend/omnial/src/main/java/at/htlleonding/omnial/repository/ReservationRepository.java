package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class ReservationRepository {

    ObjectMapper objectMapper = new ObjectMapper();

    public List<Reservation> getAllReservation() {
        //return this.entityManager.
        return null;
    }

    public void addReservation(Reservation reservation) {
        try {
            objectMapper.writeValue(new File("data/reservation.json"), reservation);
        }
        catch (IOException e){

        }
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
