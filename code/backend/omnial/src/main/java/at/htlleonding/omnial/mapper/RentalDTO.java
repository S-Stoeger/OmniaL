package at.htlleonding.omnial.mapper;

import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.repository.PersonRepository;

import java.util.Date;

public record RentalDTO(int person_id, Date leaseDate, Date returnDate, boolean isRented, boolean isReturned, Date actualReturnDate) {

}
