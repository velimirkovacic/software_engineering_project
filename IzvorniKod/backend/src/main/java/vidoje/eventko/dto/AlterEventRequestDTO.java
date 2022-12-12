package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;

public class AlterEventRequestDTO {

    @NotNull(message = "ID eventa je obavezan")
    private Long eventId;

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public String toString() {
        return "SignupEventRequestDTO{" +
                "eventId=" + eventId +
                '}';
    }
}
