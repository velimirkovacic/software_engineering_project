package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vidoje.eventko.domain.EventType;

import java.util.List;

public interface EventTypeRepo extends JpaRepository<EventType, Long> {
    @Query(value = "SELECT * FROM vrsta WHERE id_vrsta = ?1", nativeQuery = true)
    List<EventType> getByTypeId(Long id);
}
