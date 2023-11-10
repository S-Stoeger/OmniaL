package at.htlleonding.omnial.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

//@Entity
public class Reservation {
    //@Id
    private int id;
    //@ManyToOne
    //@JoinColumn(name = "roomId")
    private Room room;

    //@ManyToOne
    //@JoinColumn(name = "personId")
    private Person person;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate date;

    public Reservation(Room room, Person person, LocalDateTime startTime, LocalDateTime endTime, LocalDate date) {
        this.room = room;
        this.person = person;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
