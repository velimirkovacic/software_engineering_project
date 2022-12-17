package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.repos.EventRepo;
import vidoje.eventko.service.EventService;

import java.util.List;
import java.util.Set;

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
    public void delete(Long eventId) {
        eventRepo.delete2(eventId);
    }


    @Override
    public Event getEventById(Long id) {
        return eventRepo.getEventByEventId(id).get(0);
    }

    @Override
    public boolean exists(Long eventId) {
        return eventRepo.existsById(eventId);
    }

    @Override
    public List<Event> promotedEvents(Long userId) {
        return eventRepo.getPromotedEvents(userId);
    }
}