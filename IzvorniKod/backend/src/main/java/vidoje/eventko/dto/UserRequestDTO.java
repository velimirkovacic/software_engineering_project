package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;

public class UserRequestDTO {

    @NotNull(message = "ID drugog korisnika je obavezan")
    private Long userId;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "UserRequestDTO{" +
                "userId=" + userId +
                '}';
    }
}
