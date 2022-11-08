package vidoje.eventko.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Vrsta")
public class EventType {
    @Id
    @GeneratedValue
    @Column(name = "id_vrsta", insertable = false, updatable = false)
    private Long id;

    @Column(name = "naziv_vrsta", insertable = false, updatable = false)
    private String name;

    @Column(name = "opis_vrsta", insertable = false, updatable = false)
    private String description;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "EventType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
