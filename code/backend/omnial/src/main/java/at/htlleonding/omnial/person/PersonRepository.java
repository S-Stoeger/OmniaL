package at.htlleonding.omnial.person;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class PersonRepository {
    EntityManager entityManager;

    public Person getById(int id){
        Person person = entityManager.find(Person.class, id);

        if (person == null){
            throw new NotFoundException();
        }

        return person;
    }

}
