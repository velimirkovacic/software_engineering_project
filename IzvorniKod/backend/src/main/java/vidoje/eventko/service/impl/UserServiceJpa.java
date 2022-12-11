package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.User;
import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.UserService;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> listAllNotBlocked(Long userId) {

        return userRepo.findAllNotBlocked(userId);
    }

    @Override
    public boolean validate(String username, String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        if (username != null) {
            List<User> users = userRepo.findByUsername(username);
            if (users.size() == 1) {
                User user = users.get(0);

                byte[] salt = user.getSalt();
                byte[] hashedPassword = user.getPassword();

                KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
                SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
                byte[] newHash = factory.generateSecret(spec).getEncoded();

                return Arrays.equals(newHash, hashedPassword);
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

    @Override
    public User getUserByUsername(String username) {
        if (username != null) {
            List<User> users = userRepo.findByUsername(username);
            if (users.size() == 1) {
                User user = users.get(0);
                return user;
            }
        }
        return null;
    }

    @Override
    public void delete(Long userId) {
        userRepo.delete2(userId);
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findByUserUserId(id).get(0);
    }
}
