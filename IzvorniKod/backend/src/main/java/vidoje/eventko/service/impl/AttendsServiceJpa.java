package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Attends;
import vidoje.eventko.repos.AttendsRepo;
import vidoje.eventko.service.AttendsService;

@Service
public class AttendsServiceJpa implements AttendsService {
    @Autowired
    AttendsRepo attendsRepo;

    @Override
    public Attends getAttends(Long userId, Long eventId) {
        return attendsRepo.getAttendsByUserEventIds(userId, eventId).get(0);
    }
}
