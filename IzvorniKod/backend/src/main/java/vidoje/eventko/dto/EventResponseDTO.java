package vidoje.eventko.dto;

import vidoje.eventko.domain.Event;

import java.util.List;

public class EventResponseDTO {
    private List<Event> userAvailableEvents;

    public List<Event> getUserAvailableEvents() {
        return userAvailableEvents;
    }

    public void setUserAvailableEvents(List<Event> userAvailableEvents) {
        this.userAvailableEvents = userAvailableEvents;
    }

    @Override
    public String toString() {
        return "EventsReposnseDTO{" +
                "userAvailableEvents=" + userAvailableEvents +
                '}';
    }

    public EventResponseDTO(List<Event> userAvailableEvents) {
        this.userAvailableEvents = userAvailableEvents;
    }
}
