package vidoje.eventko.domain;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;


@Entity
public class Korisnik {

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
    private Long idKorisnik;

    @Column(nullable = false)
    private String nadimak;

    @Column(nullable = false, unique = true)
    private String korisnickoIme;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String lozinka;

    @Column(nullable = false)
    private Boolean suspendiran;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "ima_ulogu",
            joinColumns = @JoinColumn(name = "korisnik_id_korisnik"),
            inverseJoinColumns = @JoinColumn(name = "uloga_id_uloga")
    )
    private Set<Uloga> imaUloguUlogas;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "je_prijatelj",
            joinColumns = @JoinColumn(name = "korisnik_id_korisnik"),
            inverseJoinColumns = @JoinColumn(name = "korisnik_id_korisnik_parent")
    )
    private Set<Korisnik> jePrijateljKorisniks;

    @ManyToMany(mappedBy = "jePrijateljKorisniks")
    private Set<Korisnik> jePrijateljKorisniksParent;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "je_blokiran_od",
            joinColumns = @JoinColumn(name = "korisnik_id_korisnik"),
            inverseJoinColumns = @JoinColumn(name = "korisnik_id_korisnik_parent")
    )
    private Set<Korisnik> jeBlokiranOdKorisniks;

    @ManyToMany(mappedBy = "jeBlokiranOdKorisniks")
    private Set<Korisnik> jeBlokiranOdKorisniksParent;

    @OneToMany(mappedBy = "organizator")
    private Set<Dogadjaj> organizatorDogadjajs;

    @OneToMany(mappedBy = "pohadjatelj")
    private Set<Pohadja> pohadjateljPohadjas;

    public Long getIdKorisnik() {
        return idKorisnik;
    }

    public void setIdKorisnik(final Long idKorisnik) {
        this.idKorisnik = idKorisnik;
    }

    public String getNadimak() {
        return nadimak;
    }

    public void setNadimak(final String nadimak) {
        this.nadimak = nadimak;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(final String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(final String lozinka) {
        this.lozinka = lozinka;
    }

    public Boolean getSuspendiran() {
        return suspendiran;
    }

    public void setSuspendiran(final Boolean suspendiran) {
        this.suspendiran = suspendiran;
    }

    public Set<Uloga> getImaUloguUlogas() {
        return imaUloguUlogas;
    }

    public void setImaUloguUlogas(final Set<Uloga> imaUloguUlogas) {
        this.imaUloguUlogas = imaUloguUlogas;
    }

    public Set<Korisnik> getJePrijateljKorisniks() {
        return jePrijateljKorisniks;
    }

    public void setJePrijateljKorisniks(final Set<Korisnik> jePrijateljKorisniks) {
        this.jePrijateljKorisniks = jePrijateljKorisniks;
    }

    public Set<Korisnik> getJePrijateljKorisniksParent() {
        return jePrijateljKorisniksParent;
    }

    public void setJePrijateljKorisniksParent(final Set<Korisnik> jePrijateljKorisniksParent) {
        this.jePrijateljKorisniksParent = jePrijateljKorisniksParent;
    }

    public Set<Korisnik> getJeBlokiranOdKorisniks() {
        return jeBlokiranOdKorisniks;
    }

    public void setJeBlokiranOdKorisniks(final Set<Korisnik> jeBlokiranOdKorisniks) {
        this.jeBlokiranOdKorisniks = jeBlokiranOdKorisniks;
    }

    public Set<Korisnik> getJeBlokiranOdKorisniksParent() {
        return jeBlokiranOdKorisniksParent;
    }

    public void setJeBlokiranOdKorisniksParent(final Set<Korisnik> jeBlokiranOdKorisniksParent) {
        this.jeBlokiranOdKorisniksParent = jeBlokiranOdKorisniksParent;
    }

    public Set<Dogadjaj> getOrganizatorDogadjajs() {
        return organizatorDogadjajs;
    }

    public void setOrganizatorDogadjajs(final Set<Dogadjaj> organizatorDogadjajs) {
        this.organizatorDogadjajs = organizatorDogadjajs;
    }

    public Set<Pohadja> getPohadjateljPohadjas() {
        return pohadjateljPohadjas;
    }

    public void setPohadjateljPohadjas(final Set<Pohadja> pohadjateljPohadjas) {
        this.pohadjateljPohadjas = pohadjateljPohadjas;
    }

}
