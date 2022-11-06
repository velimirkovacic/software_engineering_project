package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Oznaka;


public interface OznakaRepository extends JpaRepository<Oznaka, Integer> {
}
