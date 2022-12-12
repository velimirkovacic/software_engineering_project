package vidoje.eventko.dto;

import vidoje.eventko.domain.User;

import java.util.List;

public class UserListResponseDTO extends MessageResponseDTO {
    private List<User> userList;

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public UserListResponseDTO(String message, List<User> userList) {
        super(message);
        this.userList = userList;
    }

    @Override
    public String toString() {
        return "UserListResponseDTO{" +
                "userList=" + userList +
                '}';
    }
}
