package vidoje.eventko.service;


import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.User;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Set;

//Ovdje su definirane sve funkcije za dohvat korisničkih podataka iz baze
public interface UserService {
    List<User> listAllNotBlocked(Long userId);

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

    /**
     * Provjera postoji li korisnik s istim UNIQUE atributima u sustavu
     * @param user User objekt
     * @return true ako postoji, false ako ne postoji
     */
    boolean exists(User user);


    User getUserByUsername(String username);

    User getUserById(Long id);

    void delete(Long userId);

    boolean exists(Long userId);
}
