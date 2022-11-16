package vidoje.eventko.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.persistence.*;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Korisnik")
public class User {
    public User(String username, String email, String nickname, String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        this.username = username;
        this.email = email;

        if (nickname == null) {
            this.nickname = username;
        } else {
            this.nickname = nickname;
        }

        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        this.salt = salt;

        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hash = factory.generateSecret(spec).getEncoded();
        this.password = hash;

        this.isSuspended = false;
        this.roles = new HashSet<Role>();
        this.blockedBy = new HashSet<User>();
        this.friends = new HashSet<User>();
        this.attends = new HashSet<Event>();

    }

    public User() {}



    @Id
    @GeneratedValue
    @Column(name = "id_korisnik")
    private Long id;



    @Column(name = "korisnicko_ime", nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    //private QR_code qr_code;

    @Column(name = "nadimak", nullable = false)
    private String nickname;

    @Column(name = "salt", nullable = false)
    private byte[] salt;

    @JsonIgnore
    @Column(name = "lozinka", nullable = false)
    private byte[] password;

    @Column(name = "suspendiran", nullable = false)
    private Boolean isSuspended;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "imaulogu", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_uloga"))
    private Set<Role> roles;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "jeprijatelj", joinColumns = @JoinColumn(name = "id_korisnik"), inverseJoinColumns = @JoinColumn(name = "id_prijatelj"))
    private Set<User> friends;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "jeblokiranod", joinColumns = @JoinColumn(name = "id_blokiran"), inverseJoinColumns = @JoinColumn(name = "id_blokiran_od"))
    private Set<User> blockedBy;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "pohadja", joinColumns = @JoinColumn(name = "id_pohadjatelj"), inverseJoinColumns = @JoinColumn(name = "id_dogadjaj"))
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

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }

    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
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
                ", salt=" + Arrays.toString(salt) +
                ", password=" + Arrays.toString(password) +
                ", isSuspended=" + isSuspended +
                ", roles=" + roles +
                ", friends=" + friends +
                ", blockedBy=" + blockedBy +
                ", attends=" + attends +
                '}';
    }
}
