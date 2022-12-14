package vidoje.eventko.service;


import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.Tag;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public interface RoleService {
    Role getById(Long roleId);

    Set<Role> getRolesFromRoleIds(List<Long> tagIds);
}
