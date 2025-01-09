package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Rental;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RentalRepository implements PanacheRepository<Rental> {
}
