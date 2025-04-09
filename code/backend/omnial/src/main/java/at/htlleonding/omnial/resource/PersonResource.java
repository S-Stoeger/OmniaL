package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.repository.PersonRepository;
import io.quarkus.security.identity.request.TokenAuthenticationRequest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.jwt.consumer.JwtContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/api/persons")
public class PersonResource {
    @Inject
    PersonRepository personRepository;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Person getPersonById(@PathParam("id") int id){
        return personRepository.getById(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    public Person getPersonByEmail(@QueryParam("email") String email){
        return personRepository.getByEmail(email);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Person> getAllPersons(){
        return personRepository.getAll();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/token")
    public Response getPersonByToken (@Context HttpHeaders headers) {
        try {
            // Extract token from Authorization header
            String authorizationHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("No valid authorization header found")
                        .build();
            }

            // Get the token part (after "Bearer ")
            String token = authorizationHeader.substring(7);

            // Parse the JWT token without validation
            JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                    .setSkipSignatureVerification()
                    .setSkipAllValidators()
                    .build();

            JwtContext jwtContext = jwtConsumer.process(token);
            JwtClaims claims = jwtContext.getJwtClaims();

            // Extract infos from claims
            String firstName = claims.getClaimValueAsString("given_name");
            String familyName = claims.getClaimValueAsString("family_name");
            String email = claims.getClaimValue("email").toString();
            String grade = claims.getClaimValueAsString("distinguishedName").substring(15,21);
            String studentId = claims.getClaimValueAsString("preferred_username");
            String uuid = claims.getClaimValueAsString("sub");

            Person p1 = personRepository.getByUuid(uuid);
            if (p1 == null) {
                Person tokenPerson = new Person(uuid, familyName, firstName,  email, grade);
                personRepository.addPerson(uuid , firstName, familyName,email, grade);
                return Response.ok(tokenPerson).build();

            }

            return Response.ok(p1).build();



        } catch (Exception e) {
            return Response.serverError()
                    .entity("Error processing token: " + e.getMessage())
                    .build();
        }

    }
}
