package at.htlleonding.omnial.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Rental {

    @Id
    @GeneratedValue
    @SequenceGenerator(name = "rental_seq", sequenceName = "rental_seq", allocationSize = 1, initialValue = 1)
    private Long id;

    @ManyToOne
    private Person person;

    private Date date;

    private boolean isReturned;


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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isReturned() {
        return isReturned;
    }

    public void setReturned(boolean returned) {
        isReturned = returned;
    }
}
