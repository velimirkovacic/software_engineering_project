package vidoje.eventko.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;


@Entity
public class Pohadja {

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
    private Integer recenzija;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pohadjatelj_id", nullable = false)
    private Korisnik pohadjatelj;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dogadjaj_id", nullable = false)
    private Dogadjaj dogadjaj;

    public Integer getRecenzija() {
        return recenzija;
    }

    public void setRecenzija(final Integer recenzija) {
        this.recenzija = recenzija;
    }

    public Korisnik getPohadjatelj() {
        return pohadjatelj;
    }

    public void setPohadjatelj(final Korisnik pohadjatelj) {
        this.pohadjatelj = pohadjatelj;
    }

    public Dogadjaj getDogadjaj() {
        return dogadjaj;
    }

    public void setDogadjaj(final Dogadjaj dogadjaj) {
        this.dogadjaj = dogadjaj;
    }

}
