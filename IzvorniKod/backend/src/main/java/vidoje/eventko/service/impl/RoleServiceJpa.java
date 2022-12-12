package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Role;
import vidoje.eventko.repos.RoleRepo;
import vidoje.eventko.service.RoleService;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepo roleRepo;
    @Override
    public Role getById(Long roleId) {
        return roleRepo.getById(roleId);
    }
}
