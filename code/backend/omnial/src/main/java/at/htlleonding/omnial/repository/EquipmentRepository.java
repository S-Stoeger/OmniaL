package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.EquipmentType;
import at.htlleonding.omnial.model.Person;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class EquipmentRepository implements PanacheRepository<Equipment> {

    @Inject
    EntityManager entityManager;

    public List<Equipment> getAll(){
        return entityManager.createNamedQuery(Equipment.FIND_ALL_EQUIPMENT, Equipment.class).getResultList();
    }

}
