package vidoje.eventko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import vidoje.eventko.service.UserService;
import vidoje.eventko.service.impl.UserServiceJpa;

import java.io.Console;

@SpringBootApplication
public class EventkoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventkoApplication.class, args);
	}

}
