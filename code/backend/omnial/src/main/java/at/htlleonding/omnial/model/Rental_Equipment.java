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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public boolean isIdReturned() {
        return idReturned;
    }

    public void setIdReturned(boolean idReturned) {
        this.idReturned = idReturned;
    }

    public Rental_Equipment() {
    }


    public Rental_Equipment(Rental rental, Equipment equipment, int amount, boolean idReturned) {
        this.rental = rental;
        this.equipment = equipment;
        this.amount = amount;
        this.idReturned = idReturned;
    }
}
