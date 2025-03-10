package at.htlleonding.omnial.resource;

import at.htlleonding.omnial.model.Person;
import at.htlleonding.omnial.repository.PersonRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

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


}
