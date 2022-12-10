package vidoje.eventko.service;

import vidoje.eventko.domain.Event;

import java.util.List;

public interface EventService {

    /**
     * Dohvaćanje svih događaja u sustavu
     * @return lista objekata tipa Event
     */
    List<Event> listAll();
    List<Event> listAllForUserId(Long userId);

    void add(Event event);

    Event getEventById(Long id);

    void delete(Event event);
}
