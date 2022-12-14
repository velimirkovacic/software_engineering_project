package vidoje.eventko.dto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class EditRoleUserRequestDTO {
    @NotNull(message = "Lista ID-jeva uloga je obavezna (ne smije biti prazna)")
    private List<Long> roleIds;

    @NotNull(message = "ID drugog korisnika je obavezan")
    private Long userId;

    public List<Long> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Long> roleIds) {
        this.roleIds = roleIds;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "EditRoleUserRequestDTO{" +
                "roleIds=" + roleIds +
                ", userId=" + userId +
                '}';
    }
}
