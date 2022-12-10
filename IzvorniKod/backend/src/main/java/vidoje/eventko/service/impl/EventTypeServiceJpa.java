package vidoje.eventko.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.EventType;
import vidoje.eventko.repos.EventTypeRepo;
import vidoje.eventko.service.EventTypeService;

@Service
public class EventTypeServiceJpa implements EventTypeService {
    @Autowired
    private EventTypeRepo typeRepo;

    @Override
    public EventType getEventTypeById(Long id) {
        return typeRepo.getByTypeId(id).get(0);
    }
}
