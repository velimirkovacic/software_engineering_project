package vidoje.eventko.service;

import vidoje.eventko.domain.Attends;

public interface AttendsService {
    Attends getAttends(Long userId, Long eventId);
}
