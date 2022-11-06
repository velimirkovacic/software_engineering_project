package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Pohadja;


public interface PohadjaRepository extends JpaRepository<Pohadja, Integer> {
}
