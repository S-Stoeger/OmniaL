package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.repository.EquipmentRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{type}")
    public List<Equipment> getEquipmentByType(@PathParam("type") String type) {
        return this.equipmentRepository.getEquipmentByType(type);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Equipment getEquipmentByType(@PathParam("id") Long id) {
        return Equipment.findById(id);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/available")
    public List<Equipment> getRentalAvailable(){
        return this.equipmentRepository.getEquipmentAvailable();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/popular")
    public List<Equipment> getByMostPopular(){
        return this.equipmentRepository.getEquipmentMostPopular();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/recentAvailable")
    public List<Equipment> getByRecentlyAvailable(){
        return this.equipmentRepository.getEquipmentRecently();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/again/{id}")
    public List<Equipment> getAgain(@PathParam("id") long id){
        return this.equipmentRepository.getEquipmentAgain(id);
    }




}
