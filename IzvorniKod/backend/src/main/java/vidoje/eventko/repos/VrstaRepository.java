package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Vrsta;


public interface VrstaRepository extends JpaRepository<Vrsta, Integer> {
}
