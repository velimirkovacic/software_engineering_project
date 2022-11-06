package vidoje.eventko.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import vidoje.eventko.domain.Korisnik;


public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
}
