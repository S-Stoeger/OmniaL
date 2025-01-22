package at.htlleonding.omnial.resource;


import at.htlleonding.omnial.mapper.RentalEquipmentDTO;
import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.model.Rental_Equipment;
import at.htlleonding.omnial.repository.EquipmentRepository;
import at.htlleonding.omnial.repository.RentalRepository;
import at.htlleonding.omnial.repository.Rental_equipmentReporitory;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/rental")
@Transactional
public class RentalResource {

    @Inject
    RentalRepository rentalRepository;;


    @Inject
    Rental_equipmentReporitory rentalEquipmentReporitory;

    @Inject
    EquipmentRepository equipmentRepository;

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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void addRental(Rental rental, RentalEquipmentDTO[] rentalEquipmentDTO) {
        Rental.persist(rental);
        for (int i = 0; i < rentalEquipmentDTO.length; i++) {
            Rental_Equipment.persist(RentalEquipmentDTO.toRentalEquipment(rentalEquipmentDTO[i]));
        }
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
        return rentalEquipmentReporitory.listAll();
    }



}
