package at.htlleonding.omnial.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class Reservation {
    @Id
    private int id;

    private int roomId;

}
