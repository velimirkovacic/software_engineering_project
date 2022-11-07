package vidoje.eventko.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Dogadjaj")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "organizer", "attendees"})
public class Event {
    @Id
    @GeneratedValue
    @Column(name = "id_dogadjaj")
    private Long id;

    @Column(name = "naziv", nullable = false)
    private String name;

    @Column(name = "mjesto", nullable = false)
    private String location;

    @Column(name = "vrijeme_poc", nullable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime beginningTimestamp;

    @Column(name = "vrijeme_kraj", nullable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime endTimestamp;

    @Column(name = "opis", nullable = false)
    private String description;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_organizator")
    private User organizer;

    @ManyToOne
    @JoinColumn(name = "id_vrsta")
    private EventType type;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "imaoznaku", joinColumns = @JoinColumn(name = "id_dogadjaj"), inverseJoinColumns = @JoinColumn(name = "id_oznaka"))
    private Set<Tag> tags;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "pohadja", joinColumns = @JoinColumn(name = "id_dogadjaj"), inverseJoinColumns = @JoinColumn(name = "id_pohadjatelj"))
    private Set<User> attendees;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getBeginningTimestamp() {
        return beginningTimestamp;
    }

    public void setBeginningTimestamp(LocalDateTime beginningTimestamp) {
        this.beginningTimestamp = beginningTimestamp;
    }

    public LocalDateTime getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(LocalDateTime endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public EventType getType() {
        return type;
    }

    public void setType(EventType type) {
        this.type = type;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<User> getAttendees() {
        return attendees;
    }

    public void setAttendees(Set<User> attendees) {
        this.attendees = attendees;
    }
}
