package vidoje.eventko.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vidoje.eventko.domain.Event;
import vidoje.eventko.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;
    @GetMapping("")
    public List<Event> listEvents() {
        return eventService.listAll();
    }
}