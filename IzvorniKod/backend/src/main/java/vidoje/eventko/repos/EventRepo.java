package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.stereotype.Repository;
import vidoje.eventko.domain.Event;

public interface EventRepo extends JpaRepository<Event, Long> {

}
