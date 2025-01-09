package at.htlleonding.omnial.model;

import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationDTO(
    int id,
    int roomId,
    int personId,
    LocalDateTime startTime,
    LocalDateTime endTime,
    LocalDate reservationDate
) {
}
