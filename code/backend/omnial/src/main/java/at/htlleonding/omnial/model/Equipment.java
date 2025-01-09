package at.htlleonding.omnial.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@NamedQuery(name = Equipment.FIND_ALL_EQUIPMENT , query = "SELECT e from Equipment e")
@Entity
public class Equipment {

    public static final String FIND_ALL_EQUIPMENT= "Equipment.finAll";

    @Id
    @GeneratedValue
    @SequenceGenerator(name = "equipment_seq", sequenceName = "equipment_seq", allocationSize = 1, initialValue = 1)
    private Long id;

    private String equipmentType;

    private String labelNumber;

    private String name;

    private int itemCount;

    private int available;

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabelNumber() {
        return labelNumber;
    }

    public void setLabelNumber(String labelNumber) {
        this.labelNumber = labelNumber;
    }

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
