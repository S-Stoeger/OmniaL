package at.htlleonding.omnial;

import at.htlleonding.omnial.model.Reservation;
import at.htlleonding.omnial.repository.ReservationRepository;
import org.junit.jupiter.api.Test;

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
}
