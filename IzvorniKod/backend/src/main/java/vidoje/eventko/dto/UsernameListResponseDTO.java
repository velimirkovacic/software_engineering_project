package vidoje.eventko.dto;

import java.util.List;

public class UsernameListResponseDTO extends MessageResponseDTO {
    List<String> usernames;

    public UsernameListResponseDTO(String message, List<String> usernames) {
        super(message);
        this.usernames = usernames;
    }

    public List<String> getUsernames() {
        return usernames;
    }

    public void setUsernames(List<String> usernames) {
        this.usernames = usernames;
    }

    @Override
    public String toString() {
        return "UsernameListResponseDTO{" +
                "usernames=" + usernames +
                '}';
    }
}
