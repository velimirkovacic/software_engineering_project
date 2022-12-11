package vidoje.eventko.dto;

import vidoje.eventko.domain.User;

import java.util.List;

public class UserListResponseDTO {
    private List<User> userList;

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public UserListResponseDTO() {
    }

    public UserListResponseDTO(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public String toString() {
        return "UserListResponseDTO{" +
                "userList=" + userList +
                '}';
    }
}
