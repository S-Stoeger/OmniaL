package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Room;
import at.htlleonding.omnial.repository.RoomRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/rooms")
public class RoomResource {

    @Inject
    RoomRepository roomRepository;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Room> getAllRooms(){
        return roomRepository.getAllRooms();
    }

}
