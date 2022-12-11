package vidoje.eventko.dto;

import vidoje.eventko.domain.User;

public class UserInfoResponseDTO {
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserInfoResponseDTO(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserInfoResponseDTO{" +
                "user=" + user +
                '}';
    }
}
