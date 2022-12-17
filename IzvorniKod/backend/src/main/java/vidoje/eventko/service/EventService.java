package vidoje.eventko.service;

import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.Tag;

import java.util.List;
import java.util.Set;

public interface EventService {

    /**
     * Dohvaćanje svih događaja u sustavu
     * @return lista objekata tipa Event
     */
    List<Event> listAll();
    List<Event> listAllForUserId(Long userId);

    void add(Event event);

    Event getEventById(Long id);

    public void delete(Long eventId);

    public boolean exists(Long eventId);

    List<Event> promotedEvents(Long userId);

}
