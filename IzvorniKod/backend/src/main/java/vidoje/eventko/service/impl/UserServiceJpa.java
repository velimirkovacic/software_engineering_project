package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.User;
import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.UserService;

import java.util.List;

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> listAll() {

        return userRepo.findAll();
    }

    @Override
    public boolean validate(String username, String password) {
        if (username != null) {
            if (userRepo.findByUsername(username).size() == 1 && userRepo.findByUsername(username).get(0).getPassword().equals(password)) { //TODO DODATI HASHIRANJE
                return true;
            }
        }
        return false;
    }

    @Override
    public void add(User user) {
        userRepo.save(user);
    }

    @Override
    public boolean exists(User user) {
        return (userRepo.findByUsername(user.getUsername()).size() > 0 || userRepo.findByEmail(user.getEmail()).size() > 0);
    }
}
