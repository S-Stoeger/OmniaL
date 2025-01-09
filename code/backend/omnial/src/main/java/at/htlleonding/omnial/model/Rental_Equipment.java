package at.htlleonding.omnial.model;

import jakarta.persistence.*;

@Entity
public class Rental_Equipment {

    @Id
    @GeneratedValue
    private  long id;

    @ManyToOne
    private Rental rental;

    @ManyToOne
    private Equipment equipment;

    private int amount;


}
