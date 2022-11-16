package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vidoje.eventko.domain.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

}
