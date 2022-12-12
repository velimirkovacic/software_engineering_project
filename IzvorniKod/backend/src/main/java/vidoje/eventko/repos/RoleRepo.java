package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {
}
