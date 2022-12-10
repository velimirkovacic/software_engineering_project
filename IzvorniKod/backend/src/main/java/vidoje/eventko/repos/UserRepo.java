package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.stereotype.Repository;
import vidoje.eventko.domain.User;

import javax.validation.constraints.Size;
import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);

    @Query(value = "SELECT * FROM korisnik WHERE id_korisnik = ?1", nativeQuery = true)
    List<User> findByUserUserId(Long id);

    List<User> findByEmail(String email);

}
