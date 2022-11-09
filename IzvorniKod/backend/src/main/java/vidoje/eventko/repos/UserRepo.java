package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.User;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);

    List<User> findByEmail(String email);

}
