package vidoje.eventko.service;

import org.springframework.stereotype.Service;
import vidoje.eventko.domain.User;

import java.util.List;


public interface UserService {
    /**
     * Vraća listu svih korisnika
     * @return objekt tipa List koji sadrži sve korisnike
     */
    List<User> listAll();


    /**
     * Stvara novog korisnika u sustavu.
     * @param user objekt tipa User bez parametra ID i s jedinstvenim parametrima username i email
     * @return novostvoreni objekt tipa User s postavljenim ID-jem
     * @throws IllegalArgumentException
     */
    User createUser(User user);


}
