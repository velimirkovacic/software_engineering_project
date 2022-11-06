package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Uloga;


public interface UlogaRepository extends JpaRepository<Uloga, Long> {
}
