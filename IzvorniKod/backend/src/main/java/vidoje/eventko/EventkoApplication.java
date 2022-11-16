package vidoje.eventko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


import java.io.Console;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class EventkoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventkoApplication.class, args);
	}

}
