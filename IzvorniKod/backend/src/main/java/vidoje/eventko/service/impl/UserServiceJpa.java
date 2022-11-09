package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> listAll() {

        return userRepo.findAll();
    }

    @Override
    public boolean validate(String username, String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        if (username != null) {
            if (userRepo.findByUsername(username).size() == 1) {

                byte[] salt = userRepo.findByUsername(username).get(0).getSalt();
                byte[] hashedPassword = userRepo.findByUsername(username).get(0).getPassword();

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
}
