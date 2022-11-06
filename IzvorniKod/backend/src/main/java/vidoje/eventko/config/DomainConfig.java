package vidoje.eventko.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("vidoje.eventko.domain")
@EnableJpaRepositories("vidoje.eventko.repos")
@EnableTransactionManagement
public class DomainConfig {
}
