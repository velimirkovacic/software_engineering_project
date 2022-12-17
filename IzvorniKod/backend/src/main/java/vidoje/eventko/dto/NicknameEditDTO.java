package vidoje.eventko.dto;

import javax.validation.constraints.Size;

public class NicknameEditDTO {
    public static final int MIN_USERNAME_LENGTH = 2;
    public static final int MAX_USERNAME_LENGTH = 25;


    @Size(min = MIN_USERNAME_LENGTH, max = MAX_USERNAME_LENGTH, message = "Nadimak mora imati između " + MIN_USERNAME_LENGTH + " i " + MAX_USERNAME_LENGTH + " znakova.")
    private String nickname;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "NicknameEditDTO{" +
                "nickname='" + nickname + '\'' +
                '}';
    }
}
