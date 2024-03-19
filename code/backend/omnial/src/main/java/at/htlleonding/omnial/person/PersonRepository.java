package at.htlleonding.omnial.person;

import at.htlleonding.omnial.reservation.Reservation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Qualifier;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

import java.util.List;

@ApplicationScoped
public class PersonRepository {
    @Inject
    EntityManager entityManager;

    ObjectMapper objectMapper = new ObjectMapper();

    public PersonRepository() {
        //readFromJson();
    }

    public Person getById(int id){
        Person person = entityManager.find(Person.class, id);

        if (person == null){
            throw new NotFoundException();
        }

        return person;
    }

    public void readFromJson(){

        String personsString = "";
        Path filepath = Paths.get("./data/persons.json");
        try {
            personsString = Files.readString(filepath);
        }
        catch (Exception ex){
            System.out.println("Error happened while reading reservations");
        }

        List<Person> persons = new LinkedList<>();

        try {
            persons = objectMapper.readValue(personsString, new TypeReference<List<Person>>() {});
        }
        catch (IOException ex){
            System.out.println("cant turn JSON to List");
        }

        persons.stream().forEach(a -> entityManager.persist(a));
    }

    public List<Person> getAll(){
        return entityManager.createNamedQuery(Person.FIND_ALL_PERSONS, Person.class).getResultList();
    }

    public Person getByEmail(String email){
        TypedQuery<Person> query = entityManager.createNamedQuery(Person.FIND_PERSON_BY_EMAIL, Person.class);
        query.setParameter("email", email);
        return query.getSingleResult();
    }

    @Transactional
    public void addPerson(String firstName, String lastName){
        Person newPerson = new Person(firstName,lastName);
        System.out.println(newPerson);
        entityManager.persist(newPerson);
    }

}
