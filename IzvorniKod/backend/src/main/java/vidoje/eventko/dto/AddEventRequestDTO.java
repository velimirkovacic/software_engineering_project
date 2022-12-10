package vidoje.eventko.dto;

import vidoje.eventko.domain.EventType;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.domain.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class AddEventRequestDTO {
    private String name;

    private String location;

    private Long beginningTimestamp;

    private Long endTimestamp;

    private String description;

    private Long typeId;

    private List<Long> tagIds;

    private Boolean promoted;

    private String coordinates;

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public Boolean getPromoted() {
        return promoted;
    }

    public void setPromoted(Boolean promoted) {
        this.promoted = promoted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getBeginningTimestamp() {
        return beginningTimestamp;
    }

    public void setBeginningTimestamp(Long beginningTimestamp) {
        this.beginningTimestamp = beginningTimestamp;
    }

    public Long getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(Long endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }

    @Override
    public String toString() {
        return "AddEventRequestDTO{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", beginningTimestamp=" + beginningTimestamp +
                ", endTimestamp=" + endTimestamp +
                ", description='" + description + '\'' +
                ", typeId=" + typeId +
                ", tagIds=" + tagIds +
                '}';
    }
}
