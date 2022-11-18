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
}
