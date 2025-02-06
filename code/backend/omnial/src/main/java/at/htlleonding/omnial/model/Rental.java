package at.htlleonding.omnial.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Rental extends PanacheEntity {

    @ManyToOne
    @JsonIgnoreProperties(value = {"rentals"})

    private Person person;

    private Date leaseDate;

    private Date returnDate;

    private boolean isRented;

    private boolean isReturned;

    private Date actualReturnDate;


    public Rental() {
    }

    public Rental(Person person, Date leaseDate, Date returnDate, boolean isRented, boolean isReturned) {
        this.person = person;
        this.leaseDate = leaseDate;
        this.returnDate = returnDate;
        this.isRented = isRented;
        this.isReturned = isReturned;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Date getLeaseDate() {
        return leaseDate;
    }

    public void setLeaseDate(Date leaseDate) {
        this.leaseDate = leaseDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public boolean isReturned() {
        return isReturned;
    }

    public void setReturned(boolean returned) {
        isReturned = returned;
    }

    public boolean isRented() {
        return isRented;
    }

    public void setRented(boolean rented) {
        isRented = rented;
    }

    public Date getActualReturnDate() {
        return actualReturnDate;
    }

    public void setActualReturnDate(Date actualReturnDate) {
        this.actualReturnDate = actualReturnDate;
    }
}
