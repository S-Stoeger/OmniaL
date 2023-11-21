package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class ReservationRepository {

    ObjectMapper objectMapper = new ObjectMapper();

    List<Reservation> allReservations = new LinkedList<>();


    public ReservationRepository() {
        objectMapper.registerModule(new JSR310Module());
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE_TIME));

        objectMapper.registerModule(javaTimeModule);

        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE));

        allReservations = getAllReservation();


    }

    public List<Reservation> getAllReservation() {

        String jsonReservationsArray = getReservationsFromFile();
        List<Reservation> listReservations = new LinkedList<>();

        try {
            listReservations = objectMapper.readValue(jsonReservationsArray, new TypeReference<List<Reservation>>() {});
        }
        catch (IOException ex){
            System.out.println("cant turn JSON to List");
        }


        return listReservations;
    }

    public Reservation getReservationById(int id) {
        //return this.entityManager.
        return null;
    }

    public void addReservation(Reservation reservation) {
        try {
            if(checkReservation(reservation)) {
                allReservations.add(reservation);
            }
            else {
                throw new IllegalArgumentException("Wrong Time");
            }
            objectMapper.writeValue(Paths.get("./data/reservations.json").toFile(), allReservations);
        }
        catch (IOException e){
            System.out.println("Cant add to JSON File");

        }
    }

    public void deleteReservation(int id){
        try {
            Reservation reservation = allReservations.get(id);
            if (reservation == null){
                throw new IllegalArgumentException();
            }
            allReservations.remove(reservation);
            objectMapper.writeValue(Paths.get("./data/reservations.json").toFile(), allReservations);
        }
        catch (IOException e){
            System.out.println("Cant add to JSON File");

        }
    }

    public void updateReservation(int id, Reservation reservation){
        try {
            Reservation reservationOld = allReservations.get(id);

            if (reservationOld == null){
                throw new IllegalArgumentException();
            }
            allReservations.remove(reservationOld);

            reservationOld.setReservationDate(reservation.getReservationDate());
            reservationOld.setEndTime(reservationOld.getEndTime());
            reservationOld.setPersonId(reservation.getPersonId());
            reservationOld.setRoomId(reservation.getRoomId());
            reservationOld.setStartTime(reservation.getStartTime());

            allReservations.add(reservationOld);

            objectMapper.writeValue(Paths.get("./data/reservations.json").toFile(), allReservations);
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


    public boolean checkReservation(Reservation reservation){

        for (Reservation currRes: allReservations) {
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
