package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class EditTagEventRequest {

    @NotNull(message = "Lista ID-jeva tagova je obavezna (smije biti prazna)")
    private List<Long> tagIds;

    @NotNull(message = "ID eventa je obavezan")
    private Long eventId;

    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public String toString() {
        return "EditTagEventRequest{" +
                "tagIds=" + tagIds +
                ", eventId=" + eventId +
                '}';
    }
}
