package vidoje.eventko.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Korisnik")
public class User {
    @Id
    @GeneratedValue
    private Long id;


    @Column(name = "korisnicko_ime", nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    //private QR_code qr_code;

    @Column(name = "nadimak", nullable = false)
    private String nickname;

    @Column(name = "lozinka", nullable = false)
    private String password;

    @Column(name = "suspendiran", nullable = false)
    private Boolean isSuspended;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "imaUlogu", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_uloga"))
    private Set<Role> roles;

    @ManyToMany
    @JoinTable(name = "jePrijatelj", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_prijatelj"))
    private Set<User> friends;

    @ManyToMany
    @JoinTable(name = "jeBlokiranOd", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_blokiran_od"))
    private Set<User> blockedBy;

    @ManyToMany
    @JoinTable(name = "pohadja", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_dogadjaj"))
    private Set<Event> attends;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getSuspended() {
        return isSuspended;
    }

    public void setSuspended(Boolean suspended) {
        isSuspended = suspended;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public Set<User> getBlockedBy() {
        return blockedBy;
    }

    public void setBlockedBy(Set<User> blockedBy) {
        this.blockedBy = blockedBy;
    }

    public Set<Event> getAttends() {
        return attends;
    }

    public void setAttends(Set<Event> attends) {
        this.attends = attends;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", isSuspended=" + isSuspended +
                ", roles=" + roles +
                ", friends=" + friends +
                ", blockedBy=" + blockedBy +
                ", attends=" + attends +
                '}';
    }
}
