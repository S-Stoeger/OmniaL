package at.htlleonding.omnial.mapper;

import at.htlleonding.omnial.model.Equipment;
import at.htlleonding.omnial.model.Rental;
import at.htlleonding.omnial.model.Rental_Equipment;
import at.htlleonding.omnial.repository.RentalRepository;
import jakarta.inject.Inject;

public record RentalEquipmentDTO(long rentalId, long equipmentId, boolean isReturned) {


    public static Rental_Equipment toRentalEquipment(RentalEquipmentDTO rentalEquipmentDTO){

        Equipment equipment = Equipment.findById(rentalEquipmentDTO.equipmentId);
        equipment.setAvailable(equipment.getAvailable()-1);
        Rental rental = Rental.findById(rentalEquipmentDTO.rentalId);


        return new Rental_Equipment(rental,equipment,rentalEquipmentDTO.isReturned);
    }


}
