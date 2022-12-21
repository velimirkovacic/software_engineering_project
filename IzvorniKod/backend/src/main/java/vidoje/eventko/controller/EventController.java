package vidoje.eventko.controller;


import com.sun.jdi.request.EventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.*;
import vidoje.eventko.service.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

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

    @GetMapping("/signup")
    public ResponseEntity<EventResponseDTO> getEventsForSignup(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        return ResponseEntity.ok(new EventResponseDTO("", eventService.listAllForUserId(userId).stream().filter(e -> e.getBeginningTimestamp().isAfter(LocalDateTime.now())).collect(Collectors.toList())));
    }

    @GetMapping("/calendar")
    public ResponseEntity<EventResponseDTO> getEventsForCalendar(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        return ResponseEntity.ok(new EventResponseDTO("", userService.getUserById(userId).getAttends().stream().toList()));
    }

    @GetMapping("/promoted")
    public ResponseEntity<EventResponseDTO> getPromotedEvents(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        return ResponseEntity.ok(new EventResponseDTO("", eventService.promotedEvents(userId)));
    }

    @GetMapping("/attended")
    public ResponseEntity<EventResponseDTO> getPastEventsForCalendar(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(new EventResponseDTO("", user.getAttends().stream().filter(e -> e.getEndTimestamp().isBefore(LocalDateTime.now())).collect(Collectors.toList())));
    }

    @PostMapping("/add")
    public ResponseEntity<MessageResponseDTO> addEvent(@Valid @RequestBody AddEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(user.getSuspended() && dto.getTypeId()  == 3) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik je suspendiran, ne može stvarati javne eventove"), HttpStatus.BAD_REQUEST);
        }

        Event newEvent = new Event(dto.getName(), dto.getLocation(), new Timestamp(dto.getBeginningTimestamp()).toLocalDateTime(), new Timestamp(dto.getEndTimestamp()).toLocalDateTime(), dto.getDescription(), user, eventTypeService.getEventTypeById(dto.getTypeId()), tagService.getTagsFromTagIds(dto.getTagIds()), dto.getPromoted(), dto.getCoordinates());


        eventService.add(newEvent);

        newEvent.addAttendee(user); // svatko pohadja vlastiti event

        return ResponseEntity.ok(new MessageResponseDTO("Uspješno unesen događaj"));
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponseDTO> signupForEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }


        Event event = eventService.getEventById(dto.getEventId());

        if(user.getBlockedBy().contains(event.getOrganizer())) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik je blokiran od strane organizatora eventa, ne može se prijaviti"), HttpStatus.BAD_REQUEST);
        }

        if(event.getType().getId() == 2 && user.getFriends().contains(event.getOrganizer())) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije prijatelj organizatora privatnog eventa, ne može se prijaviti"), HttpStatus.BAD_REQUEST);
        }

        if(event.getType().getId() == 1) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik se ne može prijaviti na obvezu"), HttpStatus.BAD_REQUEST);
        }


        event.addAttendee(user);


        return ResponseEntity.ok(new MessageResponseDTO("Uspješno prijavljen na događaj"));

    }

    @PostMapping("/unsign")
    public ResponseEntity<MessageResponseDTO> unsignFromEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.getEventById(dto.getEventId());
        Set<User> attendees = event.getAttendees();
        attendees.remove(user);
        event.setAttendees(attendees);

        return ResponseEntity.ok(new MessageResponseDTO("Uspješno odjavljen s događaja"));

    }

    @PostMapping("/delete")
    public ResponseEntity<MessageResponseDTO> deleteEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        if(!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(eventService.getEventById(dto.getEventId()).getOrganizer().equals(user) || user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet()).contains(Long.valueOf(3))) {
            eventService.delete(dto.getEventId());
        } else {
            return new ResponseEntity<>(new MessageResponseDTO("Samo organizator eventa i korisnik s ulogom moderator mogu izbrisati ovaj event"), HttpStatus.BAD_REQUEST);

        }

        return ResponseEntity.ok(new MessageResponseDTO("Event uspješno uklonjen"));

    }

    @PostMapping("/promote")
    public ResponseEntity<MessageResponseDTO> promoteEvent(@Valid @RequestBody AlterEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        if(!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        Event event = eventService.getEventById(dto.getEventId());

        Set<Long> roleIds = user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet());
        if(roleIds.contains(Long.valueOf(3)) || (event.getOrganizer().equals(user) && roleIds.contains(Long.valueOf(2)))) {
            event.setPromoted(true);
        } else {
            return new ResponseEntity<>(new MessageResponseDTO("Samo organizator eventa s ulogom premium i korisnik s ulogom moderator mogu izbrisati ovaj event"), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(new MessageResponseDTO("Event uspješno promoviran"));

    }

    @PostMapping("/edittag")
    public ResponseEntity<MessageResponseDTO> promoteEvent(@Valid @RequestBody EditTagEventRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        if(!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        Event event = eventService.getEventById(dto.getEventId());

        Set<Long> roleIds = user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet());
        if(roleIds.contains(Long.valueOf(3)) && event.getType().getId() == 3) {
            Set<Tag> tags = tagService.getTagsFromTagIds(dto.getTagIds());

            //tags.addAll(event.getTags());
            event.setTags(tags);
        } else {
            return new ResponseEntity<>(new MessageResponseDTO("Mijenjati oznake mogu samo moderatori i samo na javnim evetovima"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new MessageResponseDTO("Oznake uspješno dodane eventu"));
    }

    @PostMapping("/review")
    public ResponseEntity<MessageResponseDTO> promoteEvent(@Valid @RequestBody ReviewEventRequestDTO dto, HttpServletRequest request) {
        if (!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new EventResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        if (!eventService.exists(dto.getEventId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Event s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);


        Event event = eventService.getEventById(dto.getEventId());

        if(!user.getAttends().contains(event)) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije pohađao ovaj event"), HttpStatus.BAD_REQUEST);
        }

        attendsService.review(userId, event.getId(), dto.getReview());

        return ResponseEntity.ok(new MessageResponseDTO("Review uspješno dodan"));

    }
}