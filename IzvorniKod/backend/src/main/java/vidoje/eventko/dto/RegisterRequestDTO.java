package vidoje.eventko.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterRequestDTO {
    public static final int MIN_PASSWORD_LENGTH = 4;
    public static final int MIN_USERNAME_LENGTH = 2;
    public static final int MAX_USERNAME_LENGTH = 25;


    @NotNull(message = "Korisničko ime je obavezno.")
    @Size(min = MIN_USERNAME_LENGTH, max = MAX_USERNAME_LENGTH, message = "Korisničko ime mora imati između " + MIN_USERNAME_LENGTH + " i " + MAX_USERNAME_LENGTH + " znakova.")
    private String username;

    @Size(min = MIN_USERNAME_LENGTH, max = MAX_USERNAME_LENGTH, message = "Nadimak mora imati između " + MIN_USERNAME_LENGTH + " i " + MAX_USERNAME_LENGTH + " znakova.")
    private String nickname;

    @NotNull(message = "Email je obavezan.")
    @Size(min = 1, max = 255, message = "Email je obavezan.")
    @Email
    private String email;

    @NotNull(message = "Lozinka je obavezna.")
    @Size(min = MIN_PASSWORD_LENGTH, message = "Lozinka mora imati barem " + MIN_PASSWORD_LENGTH + " znakova.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "RegisterRequestDTO{" +
                "username='" + username + '\'' +
                ", nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

