package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vidoje.eventko.domain.Attends;

import javax.persistence.Tuple;
import java.util.List;

public interface AttendsRepo extends JpaRepository<Attends, Attends.AttendsKey> {
    @Query(value = "SELECT * FROM pohadja WHERE id_pohadjatelj = ?1 AND id_dogadjaj = ?2", nativeQuery = true)
    List<Attends> getAttendsByUserEventIds(Long userId, Long eventId);

    @Query(value = "SELECT COALESCE(SUM(recenzija), 0) AS score FROM pohadja NATURAL JOIN dogadjaj WHERE id_organizator = ?1", nativeQuery = true)
    Integer calculateScore(Long userId);


    @Transactional
    @Modifying
    @Query(value = "UPDATE pohadja SET recenzija = ?3 WHERE id_dogadjaj = ?2 AND id_pohadjatelj = ?1", nativeQuery = true)
    void review(Long userId, Long eventId, Integer review);

    @Query(value = "SELECT COALESCE(recenzija, 0) FROM pohadja WHERE id_pohadjatelj = ?1 AND id_dogadjaj = ?2", nativeQuery = true)
    Integer getReview(Long userId, Long eventId);

    @Query(value = "SELECT id_dogadjaj, COALESCE(recenzija, 0) AS recenzija FROM pohadja WHERE id_pohadjatelj = ?1", nativeQuery = true)
    List<Tuple> getReviews(Long userId);
}
