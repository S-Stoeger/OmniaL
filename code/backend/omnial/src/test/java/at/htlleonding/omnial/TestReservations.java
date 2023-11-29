package at.htlleonding.omnial;

import at.htlleonding.omnial.person.Person;
import at.htlleonding.omnial.reservation.Reservation;
import at.htlleonding.omnial.reservation.ReservationRepository;
import at.htlleonding.omnial.room.Room;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class TestReservations {

    private static ReservationRepository repository = new ReservationRepository();


    static Person person = new Person("lol", "hi");
    static Room room = new Room("ja", "kkk");
    @BeforeAll
    static void addTestReservation(){
        Reservation reservation = new Reservation(room,person, LocalDateTime.of(2023,11,15,15, 00,00), LocalDateTime.of(2023,11,15,20, 50,00), LocalDate.of(2023,11,15));
        repository.addReservation(reservation);
    }
    /*@Test
    void testReadFromFile() {
        String text = repository.getReservationsFromFile();

        System.out.println(text);
    }*/

    @Test
    void TestGetAllReservations() {
        List<Reservation> reservations = repository.getAllReservations();

        System.out.println(reservations);
    }

    @Test
    void TestAddReservation() {
        Reservation reservation = new Reservation(room,person, LocalDateTime.of(2023,11,15,12, 00,00), LocalDateTime.of(2023,11,15,12, 50,00), LocalDate.of(2023,11,15));
        repository.addReservation(reservation);

    }

    @Test
    void TestAddIllegalEndTime(){
        Reservation illegalReservation = new Reservation(room ,person, LocalDateTime.of(2023,11,15,9, 00,00), LocalDateTime.of(2023,11,15,10, 30,00), LocalDate.of(2023,11,15));

        assertThrows(IllegalArgumentException.class, () -> {
            repository.addReservation(illegalReservation);
        });

    }

    @Test
    void TestAddIllegalStarTime(){
        Reservation illegalReservation = new Reservation(room,person, LocalDateTime.of(2023,11,15,16, 00,00), LocalDateTime.of(2023,11,15,21, 30,00), LocalDate.of(2023,11,15));

        assertThrows(IllegalArgumentException.class, () -> {
            repository.addReservation(illegalReservation);
        });


    }


    @Test
    void TestAddIllegalTime(){
        Reservation illegalReservation = new Reservation(room,person, LocalDateTime.of(2023,11,15,17, 00,00), LocalDateTime.of(2023,11,15,17, 30,00), LocalDate.of(2023,11,15));

        assertThrows(IllegalArgumentException.class, () -> {
            repository.addReservation(illegalReservation);
        });


    }
}
