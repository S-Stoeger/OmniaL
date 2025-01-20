package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Rental_Equipment;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;


@ApplicationScoped
public class Rental_equipmentReporitory  implements PanacheRepository<Rental_Equipment> {
}
