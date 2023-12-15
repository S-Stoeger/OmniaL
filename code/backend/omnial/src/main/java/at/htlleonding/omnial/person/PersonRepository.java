package at.htlleonding.omnial.person;

import at.htlleonding.omnial.reservation.Reservation;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.io.File;
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

    @Startup
    void init(){
        readFromJson();
    }

    public PersonRepository() {
        readFromJson();
    }

    public Person getById(int id){
        Person person = entityManager.find(Person.class, id);

        if (person == null){
            throw new NotFoundException();
        }

        return person;
    }

    @Transactional
    public void readFromJson(){

        Path filepath = Paths.get("./data/persons.json");
        System.out.println("get from file");
        File file = new File("./data/persons.json");
        try {
            System.out.println(file);


            List<Person> langList = objectMapper.readValue(
                    (JsonParser) filepath,
                    new TypeReference<List<Person>>(){});
            System.out.println(langList);
            langList.stream().forEach(a -> entityManager.persist(a));

        }
        catch (Exception ex){
            System.out.println("Error happened while reading reservations");
        }



    }

    public List<Person> getAll(){
        return entityManager.createNamedQuery(Person.FIND_ALL_PERSONS, Person.class).getResultList();
    }

    public Person getByEmail(String email){
        TypedQuery<Person> query = entityManager.createNamedQuery(Person.FIND_PERSON_BY_EMAIL, Person.class);
        query.setParameter("email", email);
        return query.getSingleResult();
    }

}
