package vidoje.eventko.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginRequestDTO {
    public static final int MIN_PASSWORD_LENGTH = 4;
    public static final int MIN_USERNAME_LENGTH = 2;
    public static final int MAX_USERNAME_LENGTH = 25;


    @NotNull(message = "Korisničko ime je obavezno.")
    @Size(min = MIN_USERNAME_LENGTH, max = 25, message = "Korisničko ime mora imati između " + MIN_USERNAME_LENGTH + " i " + MAX_USERNAME_LENGTH + " 25 znakova.")
    private String username;

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

    @Override
    public String toString() {
        return "LoginRequestDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
