package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Event;
import vidoje.eventko.repos.EventRepo;
import vidoje.eventko.service.EventService;

import java.util.List;

@Service
public class EventServiceJpa implements EventService {
    @Autowired
    private EventRepo eventRepo;

    @Override
    public List<Event> listAll() {

        return eventRepo.findAll();
    }
}