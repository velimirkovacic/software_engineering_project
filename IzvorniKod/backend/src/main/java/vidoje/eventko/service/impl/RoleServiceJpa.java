package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Role;
import vidoje.eventko.repos.RoleRepo;
import vidoje.eventko.service.RoleService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepo roleRepo;
    @Override
    public Role getById(Long roleId) {
        return roleRepo.getById(roleId);
    }

    @Override
    public Set<Role> getRolesFromRoleIds(List<Long> roleIds) {
            return roleIds.stream().map(t -> roleRepo.getRoleByRoleId(t).get(0)).collect(Collectors.toSet());
    }
}
