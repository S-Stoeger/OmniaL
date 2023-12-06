package at.htlleonding.omnial.person;

import jakarta.persistence.*;

import static at.htlleonding.omnial.person.Person.FIND_ALL_PERSONS;
import static at.htlleonding.omnial.person.Person.FIND_PERSON_BY_EMAIL;

@Entity
@NamedQuery(name = FIND_PERSON_BY_EMAIL, query = "SELECT p from Person p where p.email = :email")
@NamedQuery(name = FIND_ALL_PERSONS, query = "SELECT p from Person p")
public class Person {


    public static final String FIND_ALL_PERSONS = "Person.finAll";
    public static final String FIND_PERSON_BY_EMAIL = "Person.findByEmail";

    @Id
    @SequenceGenerator(name = "person_seq", sequenceName = "person_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    private int id;

    private String surname;
    private String firstname;

    private String email;

    private String grade;


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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Person(String surname, String firstname) {
        this.surname = surname;
        this.firstname = firstname;
    }

    public Person() {
    }
}
