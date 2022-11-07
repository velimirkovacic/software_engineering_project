package vidoje.eventko.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;


@Entity
public class Oznaka {

    @Id
    @Column(nullable = false, updatable = false)
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "primary_sequence"
    )
    private Integer idOznaka;

    @Column(nullable = false)
    private String nazivOznaka;

    @Column(nullable = false, length = 7)
    private String bojaHex;

    @ManyToMany(mappedBy = "imaOznakuOznakas")
    private Set<Dogadjaj> imaOznakuDogadjajs;

    public Integer getIdOznaka() {
        return idOznaka;
    }

    public void setIdOznaka(final Integer idOznaka) {
        this.idOznaka = idOznaka;
    }

    public String getNazivOznaka() {
        return nazivOznaka;
    }

    public void setNazivOznaka(final String nazivOznaka) {
        this.nazivOznaka = nazivOznaka;
    }

    public String getBojaHex() {
        return bojaHex;
    }

    public void setBojaHex(final String bojaHex) {
        this.bojaHex = bojaHex;
    }

    public Set<Dogadjaj> getImaOznakuDogadjajs() {
        return imaOznakuDogadjajs;
    }

    public void setImaOznakuDogadjajs(final Set<Dogadjaj> imaOznakuDogadjajs) {
        this.imaOznakuDogadjajs = imaOznakuDogadjajs;
    }

}
