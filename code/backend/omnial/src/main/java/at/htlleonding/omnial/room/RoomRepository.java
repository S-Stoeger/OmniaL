package at.htlleonding.omnial.room;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.NotFoundException;


@ApplicationScoped
public class RoomRepository {
    @Inject
    EntityManager entityManager;

    public Room getRoomById(int id){
        Room room = entityManager.find(Room.class, id);

        if(room == null){
            throw new NotFoundException();
        }

        return room;
    }
}
