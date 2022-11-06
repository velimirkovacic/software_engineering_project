package vidoje.eventko.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "Dogadjaj")
public class Event {
    @Id
    @GeneratedValue
    @Column(name = "id_dogadjaj")
    private Long id;

    @Column(name = "naziv", nullable = false)
    private String name;

    @Column(name = "mjesto", nullable = false)
    private String location;

    @Column(name = "vrijeme", nullable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date timestamp;

    @Column(name = "opis", nullable = false)
    private String description;

    @ManyToOne
    private User organizer;

    @ManyToOne
    private EventType type;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "imaOznaku", joinColumns = @JoinColumn(name = "id_dogadjaj"), inverseJoinColumns = @JoinColumn(name = "id_oznaka"))
    private Set<Tag> tags;

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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
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

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", timestamp=" + timestamp +
                ", description='" + description + '\'' +
                ", organizer=" + organizer +
                ", type=" + type +
                ", tags=" + tags +
                '}';
    }
}
