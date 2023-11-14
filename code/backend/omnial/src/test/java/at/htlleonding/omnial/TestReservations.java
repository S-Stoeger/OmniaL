package at.htlleonding.omnial;

import at.htlleonding.omnial.repository.ReservationRepository;
import org.junit.jupiter.api.Test;

public class TestReservations {
    @Test
    void testReadFromFile() {
        ReservationRepository repository = new ReservationRepository();

        String text = repository.getReservationsFromFile();

        System.out.println(text);
    }
}
