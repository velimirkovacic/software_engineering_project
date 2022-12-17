package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.User;

import javax.validation.constraints.Size;
import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);

    @Query(value = "SELECT * FROM korisnik WHERE id_korisnik = ?1", nativeQuery = true)
    List<User> findByUserUserId(Long id);

    List<User> findByEmail(String email);


    @Query(value = "SELECT * FROM korisnik WHERE id_korisnik <> ?1" +
            " EXCEPT " +
            "SELECT DISTINCT korisnik.* FROM korisnik JOIN jeBlokiranOd ON id_blokiran = ?1", nativeQuery = true)
    List<User> findAllNotBlocked(Long userId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM korisnik WHERE id_korisnik = ?1", nativeQuery = true)
    void delete2(Long userId);


    @Query(value = "SELECT korisnik.*, COUNT(DISTINCT id_dogadjaj) FROM korisnik JOIN dogadjaj ON id_korisnik = id_organizator GROUP BY korisnik.id_korisnik ORDER BY COUNT(DISTINCT id_dogadjaj) DESC LIMIT 3", nativeQuery = true)
    List<User> find3MostActive();
}
