package vidoje.eventko.dto;

public class UserRequestDTO {
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
