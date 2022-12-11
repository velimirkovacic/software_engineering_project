package vidoje.eventko.dto;

import java.util.List;

public class EditTagEventRequest {
    private List<Long> tagIds;

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
