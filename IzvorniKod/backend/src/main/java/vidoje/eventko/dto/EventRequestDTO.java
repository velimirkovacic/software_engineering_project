package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EventsRequestDTO {
    public static final int MIN_USERNAME_LENGTH = 2;
    public static final int MAX_USERNAME_LENGTH = 25;


    @NotNull(message = "Korisničko ime je obavezno.")
    @Size(min = MIN_USERNAME_LENGTH, max = 25, message = "Korisničko ime mora imati između " + MIN_USERNAME_LENGTH + " i " + MAX_USERNAME_LENGTH + " 25 znakova.")
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "EventsRequestDTO{" +
                "username='" + username + '\'' +
                '}';
    }
}
