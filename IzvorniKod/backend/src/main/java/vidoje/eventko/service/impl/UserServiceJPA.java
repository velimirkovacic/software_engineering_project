package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import vidoje.eventko.domain.User;
import vidoje.eventko.dao.UserRepository;
import vidoje.eventko.exceptions.RequestDeniedException;
import vidoje.eventko.service.UserService;

import java.util.List;

import static java.lang.Long.valueOf;

@Service
public class UserServiceJPA implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> listAll() {
        return userRepo.findAll();
    }

    @Override
    public User createUser(User user) {
        System.out.println(user);
        Assert.notNull(user, "Objekt mora biti poslan");
        Assert.isNull(user.getId(), "ID mora biti null, ne " + user.getId());
        Assert.notNull(user.getEmail(), "Email mora biti poslan");

        user.setRole(valueOf(1));
        user.setSuspended(false);

        if(user.getNickname() == null) user.setNickname(user.getUsername());

        if(userRepo.countByUsername(user.getUsername()) > 0) {
            throw new RequestDeniedException("Već postoji korisnik s korisničkim imenom: " + user.getUsername());
        }
        if(userRepo.countByEmail(user.getEmail()) > 0) {
            throw new RequestDeniedException("Već postoji korisnički račun s e-mailom: " + user.getEmail());
        }

        return userRepo.save(user);
    }
}
