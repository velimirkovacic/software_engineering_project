package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.domain.User;

import java.util.List;

public interface TagRepo extends JpaRepository<Tag, Long> {
    @Query(value = "SELECT * FROM oznaka WHERE id_oznaka = ?1", nativeQuery = true)
    List<Tag> getTagByTagId(Long id);

}
