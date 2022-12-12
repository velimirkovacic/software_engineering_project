package vidoje.eventko.dto;

import vidoje.eventko.domain.EventType;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.domain.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class AddEventRequestDTO {

    @NotNull(message = "Ime je obavezno")
    private String name;

    @NotNull(message = "Lokacija je obavezna")
    private String location;

    @NotNull(message = "Vrijeme početka je obavezno")
    private Long beginningTimestamp;

    @NotNull(message = "Vrijeme kraja je obavezno")
    private Long endTimestamp;

    @NotNull(message = "Opis je obavezan")
    private String description;

    @NotNull(message = "ID vrste eventa je obavezan")
    private Long typeId;

    @NotNull(message = "Lista ID tagova je obavezna (smije biti prazna lista)")
    private List<Long> tagIds;

    private Boolean promoted;

    @NotNull(message = "Koordinate su obavezne")
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
