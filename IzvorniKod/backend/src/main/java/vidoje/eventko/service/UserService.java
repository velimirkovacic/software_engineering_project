package vidoje.eventko.service;


import vidoje.eventko.domain.User;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

//Ovdje su definirane sve funkcije za dohvat korisničkih podataka iz baze
public interface UserService {
    List<User> listAll();

    /**
     * Provjerava postoji li takav korisnik u bazi podataka
     * @param username korisničko ime
     * @param password lozinka
     * @return true ako postoji, false ako ne postoji
     */
    boolean validate(String username, String password) throws NoSuchAlgorithmException, InvalidKeySpecException;

    /**
     * Dodavanje korisnika u sustav
     * @param user User objekt
     */
    void add(User user);

    boolean exists(User user);

}
