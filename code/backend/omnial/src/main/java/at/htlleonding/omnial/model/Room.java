package at.htlleonding.omnial.model;

import jakarta.persistence.*;

import static at.htlleonding.omnial.model.Room.FIND_ALL_ROOMS;

@Entity
@NamedQuery(name = FIND_ALL_ROOMS, query = "SELECT r from Room r")
public class Room {

    public static final String FIND_ALL_ROOMS = "Room.findAll";

    @Id
    @SequenceGenerator(name = "room_seq", sequenceName = "room_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_seq")
    private Integer id;

    private String name;
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Room(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Room() {
    }
}
