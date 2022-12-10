package vidoje.eventko.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.*;
import vidoje.eventko.service.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.sql.Timestamp;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;
    @Autowired
    private EventTypeService eventTypeService;
    @Autowired
    private UserService userService;

    @Autowired
    private AttendsService attendsService;

    @Autowired
    private TagService tagService;
    //@GetMapping("")
    //public List<Event> listEvents() {
    //    return eventService.listAll();
    //}

    @GetMapping("")
    public ResponseEntity<EventResponseDTO> getEvents(HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        return ResponseEntity.ok(new EventResponseDTO(eventService.listAllForUserId(userId)));
    }

    @PostMapping("/add")
    public ResponseEntity<MessageResponseDTO> addEvent(@Valid @RequestBody AddEventRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);
        Event newEvent = new Event(dto.getName(), dto.getLocation(), new Timestamp(dto.getBeginningTimestamp()).toLocalDateTime(), new Timestamp(dto.getEndTimestamp()).toLocalDateTime(), dto.getDescription(), user, eventTypeService.getEventTypeById(dto.getTypeId()), tagService.getTagsFromTagIds(dto.getTagIds()), dto.getPromoted(), dto.getCoordinates());

        eventService.add(newEvent);

        return ResponseEntity.ok(new MessageResponseDTO("Uspješno unesen događaj"));
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponseDTO> signupForEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);
        System.out.println(dto.getEventId() + "AAAA");
        Event event = eventService.getEventById(dto.getEventId());
        event.addAttendee(user);


        return ResponseEntity.ok(new MessageResponseDTO("Uspješno prijavljen na događaj"));

    }

    @PostMapping("/delete")
    public ResponseEntity<MessageResponseDTO> deleteEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        eventService.delete(eventService.getEventById(dto.getEventId()));

        //TODO dodati provjeru vlastnosti i egzistencije eventa
        return ResponseEntity.ok(new MessageResponseDTO("Event uspješno uklonjen"));

    }

    @PostMapping("/promote")
    public ResponseEntity<MessageResponseDTO> promoteEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        Event event = eventService.getEventById(dto.getEventId());

        event.setPromoted(true);

        return ResponseEntity.ok(new MessageResponseDTO("Event uspješno promoviran"));

    }
}