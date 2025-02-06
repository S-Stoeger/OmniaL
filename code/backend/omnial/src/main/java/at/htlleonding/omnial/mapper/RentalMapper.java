package at.htlleonding.omnial.mapper;


import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.repository.PersonRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RentalMapper {

    @Inject
    PersonRepository personRepository;


    public Rental toRental(RentalDTO rentalDTO){
        Person person = personRepository.getById(rentalDTO.person_id());
        return new Rental(person, rentalDTO.leaseDate(), rentalDTO.returnDate(), rentalDTO.isRented(), rentalDTO.isReturned());
    }


}
