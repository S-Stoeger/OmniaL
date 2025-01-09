package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.repository.EquipmentRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/equipment")
@Transactional
public class EquipmentResource {

    @Inject
    EquipmentRepository equipmentRepository;;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Equipment> getEquipment() {
        return equipmentRepository.getAll();
    }

}
