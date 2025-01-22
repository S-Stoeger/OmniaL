package at.htlleonding.omnial.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
public class Rental_Equipment extends PanacheEntity {


    @ManyToOne
    private Rental rental;

    @ManyToOne
    private Equipment equipment;

    private boolean idReturned;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public boolean isIdReturned() {
        return idReturned;
    }

    public void setIdReturned(boolean idReturned) {
        this.idReturned = idReturned;
    }

    public Rental_Equipment() {
    }


    public Rental_Equipment(Rental rental, Equipment equipment, boolean idReturned) {
        this.rental = rental;
        this.equipment = equipment;
        this.idReturned = idReturned;
    }
}
