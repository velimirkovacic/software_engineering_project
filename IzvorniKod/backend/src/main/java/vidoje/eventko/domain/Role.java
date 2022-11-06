package vidoje.eventko.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Uloga")
public class Role {
    @Id
    @Column(name = "id_role", insertable = false, updatable = false)
    private Long id;

    @Column(name = "naziv_uloga", insertable = false, updatable = false)
    private String name;

    @Column(name = "opis_uloga", insertable = false, updatable = false)
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
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
