package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Event;

public interface EventRepo extends JpaRepository<Event, Long> {

}
