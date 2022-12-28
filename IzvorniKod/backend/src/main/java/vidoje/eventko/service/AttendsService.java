package vidoje.eventko.service;

import vidoje.eventko.domain.Attends;

public interface AttendsService {
    Attends getAttends(Long userId, Long eventId);

    void review(Long userId, Long eventId, Integer review);

    Integer score(Long userId);

    Integer getReview(Long userId, Long eventId);
}
