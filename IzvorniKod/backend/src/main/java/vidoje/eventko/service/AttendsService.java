package vidoje.eventko.service;

import vidoje.eventko.domain.Attends;

import javax.persistence.Tuple;
import java.util.List;
import java.util.Map;

public interface AttendsService {
    Attends getAttends(Long userId, Long eventId);

    void review(Long userId, Long eventId, Integer review);

    Integer score(Long userId);

    Integer getReview(Long userId, Long eventId);

    Map<Long, Long> getReviews(Long userId); // event id, review
}
