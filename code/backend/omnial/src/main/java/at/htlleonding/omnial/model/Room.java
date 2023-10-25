package at.htlleonding.omnial.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Room {
    @Id
    private Long id;

    private String name;
    private String description;
}
