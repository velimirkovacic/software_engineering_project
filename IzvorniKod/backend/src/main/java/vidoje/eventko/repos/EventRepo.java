package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vidoje.eventko.domain.Event;

import java.util.List;

public interface EventRepo extends JpaRepository<Event, Long> {

    // Svi događaji koje je stvorio (obveze i privatni), svi privatni događaji prijatelja i svi javni događaji ljudi koji ga nisu blokirali
    @Query(value = "SELECT * FROM dogadjaj WHERE id_vrsta = 3" +
            " UNION " +
            "SELECT DISTINCT dogadjaj.* FROM dogadjaj JOIN jePrijatelj ON id_organizator = id_prijatelj WHERE id_korisnik = ?1 AND id_vrsta = 2" +
            " EXCEPT " +
            "SELECT DISTINCT dogadjaj.* FROM dogadjaj JOIN jeBlokiranOd ON id_organizator = id_blokiran_od WHERE id_blokiran = ?1 AND id_vrsta = 3" +
            " EXCEPT " +
            "SELECT DISTINCT dogadjaj.* FROM dogadjaj NATURAL JOIN pohadja WHERE id_pohadjatelj = ?1", nativeQuery = true)


    List<Event> findAllAvailableByUserId(Long userId);


    @Query(value = "SELECT * FROM dogadjaj WHERE id_dogadjaj = ?1", nativeQuery = true)
    List<Event> getEventByEventId(Long eventId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dogadjaj WHERE id_dogadjaj = ?1", nativeQuery = true)
    void delete2(Long eventId);

    @Query(value = "SELECT * FROM dogadjaj  WHERE promoviran = TRUE AND vrijeme_poc > current_timestamp AND id_organizator <> ?1", nativeQuery = true)
    List<Event> getPromotedEvents(Long userId);
}
