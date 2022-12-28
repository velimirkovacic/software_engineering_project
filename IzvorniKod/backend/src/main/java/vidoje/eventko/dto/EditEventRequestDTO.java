package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;

public class EditEventRequestDTO extends AddEventRequestDTO {
    @NotNull(message = "eventId je ovavezan!")
    private Long eventId;

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public String toString() {
        return "EditEventRequestDTO{" +
                "eventId=" + eventId +
                '}';
    }
}
