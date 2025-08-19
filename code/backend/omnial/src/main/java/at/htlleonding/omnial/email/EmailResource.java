package at.htlleonding.omnial.email;

import at.htlleonding.omnial.model.Room;
import at.htlleonding.omnial.repository.RoomRepository;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/email")
public class EmailResource {

    @Inject
    Mailer mailer;

    @POST
    @Path("/send")
    public Response sendEmail() {
        mailer.send(Mail.withText(
                "s.Binder@students.htl-leonding.ac.at",      // To
                "Hello from Quarkus!",        // Subject
                "This is a test email from Quarkus." // Body
        ));
        return Response.ok("Email sent successfully!").build();
    }
}
