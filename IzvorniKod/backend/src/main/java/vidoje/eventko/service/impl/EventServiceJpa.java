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
    public List<Event> listAllForUserId(Long userId) {
        return eventRepo.findAllAvailableByUserId(userId);
    }

    @Override
    public void add(Event event) {
        eventRepo.save(event);
    }

    @Override
    public List<Event> listAll() {

        return eventRepo.findAll();
    }

    @Override
    public void delete(Event event) {
        eventRepo.delete2(event);
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepo.getEventByEventId(id).get(0);
    }
}