package vidoje.eventko.service;


import vidoje.eventko.domain.User;

import java.util.List;

//Ovdje su definirane sve funkcije za dohvat korisničkih podataka iz baze
public interface UserService {
    List<User> listAll();
    boolean validate(String username, String password);
}
