package at.htlleonding.omnial;

import at.htlleonding.omnial.model.Reservation;
import at.htlleonding.omnial.repository.ReservationRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class TestReservations {
    @Test
    void testReadFromFile() {
        ReservationRepository repository = new ReservationRepository();

        String text = repository.getReservationsFromFile();

        System.out.println(text);
    }

    @Test
    void TestGetAllReservations() {
        ReservationRepository repository = new ReservationRepository();

        List<Reservation> reservations = repository.getAllReservation();

        System.out.println(reservations);
    }

    @Test
    void TestAddReservation() {
        ReservationRepository repository = new ReservationRepository();
        Reservation reservation = new Reservation(1,1, LocalDateTime.of(2023,11,15,12, 00,00), LocalDateTime.of(2023,11,15,12, 50,00), LocalDate.of(2023,11,15));
        repository.addReservation(reservation);

        System.out.println(repository.getReservationsFromFile());
    }
}
