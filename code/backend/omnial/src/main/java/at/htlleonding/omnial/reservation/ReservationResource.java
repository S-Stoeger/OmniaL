package at.htlleonding.omnial.reservation;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;

@Path("/api/reservations")
@RequestScoped
public class ReservationResource {
    @Inject
    ReservationRepository reservationRepository;

    @Inject
    ReservationMapper reservationMapper;

    @Inject
    JsonWebToken jwt;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    @PermitAll
    public List<ReservationDTO> reservationList() {
        return this.reservationRepository.getAllReservations().stream().map(reservationMapper::toDTO).toList();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @RolesAllowed({"admin"})
    public ReservationDTO reservationById(@PathParam("id") int id){
        return reservationMapper.toDTO(this.reservationRepository.findByIdReservation(id));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/room/{id}")
    public List<ReservationDTO> reservationByRoom(@PathParam("id") int id){
        return reservationRepository.getReservationsByRoom(id).stream().map(reservationMapper::toDTO).toList();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/person/{id}")
    public List<ReservationDTO> reservationByPerson(@PathParam("id") int id){
        return reservationRepository.getReservationsByPerson(id).stream().map(reservationMapper::toDTO).toList();
    }

    @POST
    @RolesAllowed({"Admin"})
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