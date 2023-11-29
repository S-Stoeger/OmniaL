package at.htlleonding.omnial.boundary;

import at.htlleonding.omnial.model.Reservation;
import at.htlleonding.omnial.repository.ReservationRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/reservations")
public class ReservationResource {
    @Inject
    ReservationRepository reservationRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Reservation> reservationList() {
        return this.reservationRepository.getAllReservation();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void addReservation(Reservation reservation){
        this.reservationRepository.addReservation(reservation);
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public void deleteReservation(@PathParam("id") int id){
        this.reservationRepository.deleteReservation(id);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public void updateReservation(@PathParam("id") int id, Reservation reservation){
        this.reservationRepository.updateReservation(id,reservation);
    }
}