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
public class Uloga {

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
    private Long idUloga;

    @Column(nullable = false)
    private String nazivUloga;

    @Column(nullable = false)
    private String opisUloga;

    @ManyToMany(mappedBy = "imaUloguUlogas")
    private Set<Korisnik> imaUloguKorisniks;

    public Long getIdUloga() {
        return idUloga;
    }

    public void setIdUloga(final Long idUloga) {
        this.idUloga = idUloga;
    }

    public String getNazivUloga() {
        return nazivUloga;
    }

    public void setNazivUloga(final String nazivUloga) {
        this.nazivUloga = nazivUloga;
    }

    public String getOpisUloga() {
        return opisUloga;
    }

    public void setOpisUloga(final String opisUloga) {
        this.opisUloga = opisUloga;
    }

    public Set<Korisnik> getImaUloguKorisniks() {
        return imaUloguKorisniks;
    }

    public void setImaUloguKorisniks(final Set<Korisnik> imaUloguKorisniks) {
        this.imaUloguKorisniks = imaUloguKorisniks;
    }

}
