package at.htlleonding.omnial.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @SequenceGenerator(name = "reservation_seq", sequenceName = "reservation_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_seq")
    private int id;
    private static int countId;
    //@ManyToOne
    //@JoinColumn(name = "roomId")
    private int roomId;

    //@ManyToOne
    //@JoinColumn(name = "personId")
    private int personId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate reservationDate;

    public Reservation(int roomId, int personId, LocalDateTime startTime, LocalDateTime endTime, LocalDate date) {
        countId = countId+2;
        id =countId;
        this.roomId = roomId;
        this.personId = personId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reservationDate = date;
    }

    public Reservation() {
    }

    public int getId() {
        return id;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int room) {
        this.roomId= room;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int person) {
        this.personId = person;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate date) {
        this.reservationDate = date;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", roomId=" + roomId +
                ", personId=" + personId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", reservationDate=" + reservationDate +
                '}';
    }
}
