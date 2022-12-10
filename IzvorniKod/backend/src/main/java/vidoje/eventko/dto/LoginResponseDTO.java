package vidoje.eventko.dto;

import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.User;

import java.util.Set;

public class LoginResponseDTO {
    private String message;

    private User user;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "LoginResponseDTO{" +
                "message='" + message + '\'' +
                ", user=" + user +
                '}';
    }

    public LoginResponseDTO(String message, User user) {
        this.message = message;
        this.user = user;
    }
}
