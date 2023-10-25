package at.htlleonding.omnial.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    private int id;
    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "personId")
    private Person person;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate date;

}
