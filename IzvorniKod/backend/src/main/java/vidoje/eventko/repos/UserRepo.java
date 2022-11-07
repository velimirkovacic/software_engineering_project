package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
