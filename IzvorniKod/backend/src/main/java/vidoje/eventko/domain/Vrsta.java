package vidoje.eventko.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;


@Entity
public class Vrsta {

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
    private Integer idVrsta;

    @Column(nullable = false)
    private String nazivVrsta;

    @Column(nullable = false)
    private String opisVrsta;

    @OneToMany(mappedBy = "vrsta")
    private Set<Dogadjaj> vrstaDogadjajs;

    public Integer getIdVrsta() {
        return idVrsta;
    }

    public void setIdVrsta(final Integer idVrsta) {
        this.idVrsta = idVrsta;
    }

    public String getNazivVrsta() {
        return nazivVrsta;
    }

    public void setNazivVrsta(final String nazivVrsta) {
        this.nazivVrsta = nazivVrsta;
    }

    public String getOpisVrsta() {
        return opisVrsta;
    }

    public void setOpisVrsta(final String opisVrsta) {
        this.opisVrsta = opisVrsta;
    }

    public Set<Dogadjaj> getVrstaDogadjajs() {
        return vrstaDogadjajs;
    }

    public void setVrstaDogadjajs(final Set<Dogadjaj> vrstaDogadjajs) {
        this.vrstaDogadjajs = vrstaDogadjajs;
    }

}
