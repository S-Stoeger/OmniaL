package at.htlleonding.omnial.reservation;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/reservations")
public class ReservationResource {
    @Inject
    ReservationRepository reservationRepository;

    @Inject
    ReservationMapper reservationMapper;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<ReservationDTO> reservationList() {
        return this.reservationRepository.getAllReservations().stream().map(reservationMapper::toDTO).toList();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public ReservationDTO reservationById(@PathParam("id") int id){
        return reservationMapper.toDTO(this.reservationRepository.findByIdReservation(id));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void addReservation(ReservationDTO reservationDTO){
        this.reservationRepository.addReservation(reservationMapper.toEntity(reservationDTO));
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
    public void updateReservation(@PathParam("id") int id, ReservationDTO reservationDTO){
        this.reservationRepository.updateReservation(id,reservationMapper.toEntity(reservationDTO));
    }
}