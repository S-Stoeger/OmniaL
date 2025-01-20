package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class RentalRepository{

    @Inject
    EntityManager entityManager;

    public List<Rental> getReservationByUser(long id) {
        return entityManager.createQuery("select r from Rental r where r.person.id = :id", Rental.class)
                .setParameter("id", id) // Set the type parameter
                .getResultList();          // Execute the query and return the result
    }



}
