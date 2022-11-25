package vidoje.eventko.domain;

import javax.persistence.*;

@Entity
@Table(name = "Oznaka")
public class Tag {
    @Id
    @GeneratedValue
    @Column(name = "id_oznaka")
    private Long id;

    @Column(name = "naziv_oznaka", nullable = false)
    private String name;

    @Column(name = "boja_hex", nullable = false)
    private String hexColor;

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

    public String getHexColor() {
        return hexColor;
    }

    public void setHexColor(String hexColor) {
        this.hexColor = hexColor;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hexColor='" + hexColor + '\'' +
                '}';
    }
}
