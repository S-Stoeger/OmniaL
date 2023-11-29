package at.htlleonding.omnial.model;

import jakarta.persistence.*;

@Entity
public class Person {
    @Id
    @SequenceGenerator(name = "person_seq", sequenceName = "person_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    private int id;

    private String surname;
    private String firstname;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
}
