package vidoje.eventko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


import java.io.Console;

//@EnableJpaRepositories(basePackages = {"vidoje.eventko.repos"})
@SpringBootApplication
public class EventkoApplication {

	public static void main(String[] args) {
	System.out.println(System.getenv());
		SpringApplication.run(EventkoApplication.class, args);
	}

}
