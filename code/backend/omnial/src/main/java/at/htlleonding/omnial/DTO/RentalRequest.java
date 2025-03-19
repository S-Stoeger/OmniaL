package at.htlleonding.omnial.DTO;

import java.util.Date;
import java.util.List;

public class RentalRequest {
    public int personId;
    public Date leaseDate;
    public Date returnDate;
    public List<Long> equipmentIds;
}
