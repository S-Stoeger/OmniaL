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
public class EquipmentRepository  {

    @Inject
    EntityManager entityManager;

    public List<Equipment> getAll(){
        return entityManager.createNamedQuery(Equipment.FIND_ALL_EQUIPMENT, Equipment.class).getResultList();
    }

    public List<Equipment> getEquipmentByType(String type) {
        return entityManager.createQuery("select e from Equipment e where e.equipmentType = :type", Equipment.class)
                .setParameter("type", type)
                .getResultList();
    }

    public List<Equipment> getEquipmentAvailable() {
        return entityManager.createQuery("select e from Equipment e , Rental_Equipment re where e.available >= 1", Equipment.class)
                .getResultList();
    }


    public List<Equipment> getEquipmentMostPopular() {
        return entityManager.createQuery("select e from Equipment e  , Rental_Equipment re where re.equipment.id = e.id order by count(re)", Equipment.class)
                .getResultList();
    }

    public List<Equipment> getEquipmentRecently() {
        return entityManager.createQuery("select e from Equipment e  , Rental_Equipment re where re.equipment.id = e.id order by re.rental.date", Equipment.class)
                .getResultList();
    }

    public List<Equipment> getEquipmentAgain(long id) {
        return entityManager.createQuery("select e from Equipment e  , Rental_Equipment re, Person p where re.equipment.id = e.id and re.rental.person.id = :id order by rental.date", Equipment.class).setParameter("id", id)
                .getResultList();
    }





}
