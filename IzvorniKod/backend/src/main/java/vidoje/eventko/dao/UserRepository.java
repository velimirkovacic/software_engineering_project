package vidoje.eventko.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    int countByUsername(String username);

    int countByEmail(String email);
}
