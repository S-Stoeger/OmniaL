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

    Map<Integer,Reservation> reservations = new HashMap<>();

    public ReservationRepository() {
        objectMapper.registerModule(new JSR310Module());
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE_TIME));

        objectMapper.registerModule(javaTimeModule);

        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE));

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
        List<Reservation> listReservations = getAllReservation();
        try {
            listReservations.add(reservation);
            System.out.println(listReservations);
            //objectMapper.writeValue(new File("./data/reservations-test.json"), reservation);
            //this.reservations.put(reservation, reservation.getId());
            objectMapper.writeValue(Paths.get("./data/reservations-test.json").toFile(), listReservations);
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
