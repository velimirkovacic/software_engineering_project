package vidoje.eventko.domain;

import java.time.OffsetDateTime;
import java.util.Set;
import javax.persistence.*;


@Entity
public class Dogadjaj {

    @Id
    @Column(name= "dogadjaj_id", nullable = false, updatable = false)
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
    private Long idDogadjaj;

    @Column(nullable = false)
    private String naziv;

    @Column(nullable = false)
    private String mjesto;

    @Column(nullable = false)
    private OffsetDateTime vrijeme;

    @Column(nullable = false)
    private String opis;

    @Column(nullable = false)
    private Boolean promoviran;

    @Column(nullable = false)
    private String koordinate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizator_id", nullable = false)
    private Korisnik organizator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vrsta_id", nullable = false)
    private Vrsta vrsta;

    @OneToMany(mappedBy = "dogadjaj")
    private Set<Pohadja> dogadjajPohadjas;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "ima_oznaku",
            joinColumns = @JoinColumn(name = "dogadjaj_id_dogadjaj"),
            inverseJoinColumns = @JoinColumn(name = "oznaka_id_oznaka")
    )
    private Set<Oznaka> imaOznakuOznakas;

    public Long getIdDogadjaj() {
        return idDogadjaj;
    }

    public void setIdDogadjaj(final Long idDogadjaj) {
        this.idDogadjaj = idDogadjaj;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(final String naziv) {
        this.naziv = naziv;
    }

    public String getMjesto() {
        return mjesto;
    }

    public void setMjesto(final String mjesto) {
        this.mjesto = mjesto;
    }

    public OffsetDateTime getVrijeme() {
        return vrijeme;
    }

    public void setVrijeme(final OffsetDateTime vrijeme) {
        this.vrijeme = vrijeme;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(final String opis) {
        this.opis = opis;
    }

    public Boolean getPromoviran() {
        return promoviran;
    }

    public void setPromoviran(final Boolean promoviran) {
        this.promoviran = promoviran;
    }

    public String getKoordinate() {
        return koordinate;
    }

    public void setKoordinate(final String koordinate) {
        this.koordinate = koordinate;
    }

    public Korisnik getOrganizator() {
        return organizator;
    }

    public void setOrganizator(final Korisnik organizator) {
        this.organizator = organizator;
    }

    public Vrsta getVrsta() {
        return vrsta;
    }

    public void setVrsta(final Vrsta vrsta) {
        this.vrsta = vrsta;
    }

    public Set<Pohadja> getDogadjajPohadjas() {
        return dogadjajPohadjas;
    }

    public void setDogadjajPohadjas(final Set<Pohadja> dogadjajPohadjas) {
        this.dogadjajPohadjas = dogadjajPohadjas;
    }

    public Set<Oznaka> getImaOznakuOznakas() {
        return imaOznakuOznakas;
    }

    public void setImaOznakuOznakas(final Set<Oznaka> imaOznakuOznakas) {
        this.imaOznakuOznakas = imaOznakuOznakas;
    }

}
