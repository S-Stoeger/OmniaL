package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;


import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@ApplicationScoped
public class ReservationRepository {

    ObjectMapper objectMapper = new ObjectMapper();

    Map<Reservation, Integer> reservations = new HashMap<>();


    public List<Reservation> getAllReservation() {
        //return this.entityManager.
        String jsonReservationsArray = getReservationsFromFile();
        try {
            List<Reservation> listCar = objectMapper.readValue(jsonReservationsArray, new TypeReference<List<Reservation>>() {});
        }
        catch (IOException ex){
            System.out.println("cant turn JSON to List");
        }

        return null;
    }

    public Reservation getReservationById(int id) {
        //return this.entityManager.
        return null;
    }

    public void addReservation(Reservation reservation) {
        try {
            objectMapper.writeValue(new File("./data/reservations.json"), reservation);
        }
        catch (IOException e){
            System.out.println("Cant add to JSON File");

        }
    }

    public String getReservationsFromFile(){
        String reservationString = "";
        Path filepath = Paths.get("./data/reservations.json");
        try {
            reservationString = Files.readString(filepath);
        }
        catch (Exception ex){
            System.out.println("Error happened while reading reservations");
        }
        return reservationString;
    }



}
