package at.htlleonding.omnial.resource;


import at.htlleonding.omnial.DTO.RentalRequest;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.model.Rental_Equipment;
import at.htlleonding.omnial.repository.EquipmentRepository;
import at.htlleonding.omnial.repository.PersonRepository;
import at.htlleonding.omnial.repository.RentalRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Path("api/rental")
@Transactional
public class RentalResource {

    @Inject
    RentalRepository rentalRepository;;


    @Inject
    EquipmentRepository equipmentRepository;

    @Inject
    PersonRepository personRepository;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Rental> getRental() {
        return Rental.listAll();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Rental getRentalId(@PathParam("id") long id) {
        return Rental.findById(id);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public List<Rental> getRentalByUserId(@PathParam("id") long id) {
        return rentalRepository.getReservationByUser(id);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/eq/list")
    public List<Rental_Equipment> getRentalEquipment() {
        return Rental_Equipment.listAll();
    }


    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/rent/{id}")
    public Rental updateRentalRent(Rental rental, @PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setRented(true);
        return rental1;
    }


    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/return/{id}")
    public Rental updateRentalReturn(Rental rental, @PathParam("id") long id) {
        Rental rental1 = Rental.findById(id);
        rental1.setReturned(true);

        if (Date.from(Instant.now()).after(rental1.getReturnDate())){
            rental1.setActualReturnDate(Date.from(Instant.now()));
        }


        return rental1;
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRental(RentalRequest rentalRequest) {
        Rental rental = new Rental();
        rental.person = personRepository.getById(rentalRequest.personId);
        rental.leaseDate = rentalRequest.leaseDate;
        rental.returnDate = rentalRequest.returnDate;
        rental.isRented = false;
        rental.isReturned = false;
        Rental.persist(rental);


        for (Long equipmentId : rentalRequest.equipmentIds) {
            Equipment equipment = Equipment.findById(equipmentId);
            equipment.setAvailable(equipment.getAvailable()-1);
            if (equipment != null) {
               Rental_Equipment rentalEquipment = new Rental_Equipment(rental, equipment);
               Rental_Equipment.persist(rentalEquipment);
            }
        }

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteRental(RentalRequest rentalRequest) {
        Rental toDelete = Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        long deleteCount = Rental_Equipment.delete("rental.id = ?1", toDelete.id);
        long deleted2Count = Rental.delete(
                "person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate
        );

        // Optional: Protokollierung der gelöschten Einträge
        if (deleteCount == rentalRequest.equipmentIds.size() && deleted2Count > 0) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
    }

    @PUT
    @Path("/rent")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateIsRented(RentalRequest rentalRequest) {
        Rental myRental= Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        myRental.isRented = true;

        return Response.ok().build();

    }
    @PUT
    @Path("/return")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateReturn(RentalRequest rentalRequest) {
        Rental myRental= Rental.find("person.id = ?1 and leaseDate = ?2 and returnDate = ?3",
                rentalRequest.personId, rentalRequest.leaseDate, rentalRequest.returnDate).firstResult();

        if(myRental.isRented) {
            myRental.isRented = false;
            myRental.isReturned = true;
            return Response.ok().build();

        }else {
            return Response.status(Response.Status.FORBIDDEN).build();
        }




    }

}
