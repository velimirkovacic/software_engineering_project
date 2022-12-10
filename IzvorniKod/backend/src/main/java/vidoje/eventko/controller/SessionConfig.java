package vidoje.eventko.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
@EnableJdbcHttpSession
@Configuration
public class SessionConfig extends AbstractHttpSessionApplicationInitializer {


}
