package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.Tag;

import java.util.List;

public interface RoleRepo extends JpaRepository<Role, Long> {
    @Query(value = "SELECT * FROM uloga WHERE id_uloga = ?1", nativeQuery = true)
    List<Role> getRoleByRoleId(Long id);


}
