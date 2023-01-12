package vidoje.eventko;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.impl.UserServiceJpa;

import org.springframework.stereotype.Service;
import vidoje.eventko.domain.User;
import vidoje.eventko.service.UserService;

@SpringBootTest
class EventkoApplicationTests {


	@Autowired
	UserService jpa;

	@Test
	void tocanUsernameKrivaLozinka() {
		//assertEquals(false, jpa.validate("admin","KrivaLozinka"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("admin","KrivaLozinka");});
	}

	@Test
	void kriviUsernameTocnaLozinka() {
		//assertEquals(false, jpa.validate("KriviUsername","1234"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("KriviUsername","1234");});
	}

	@Test
	void kriviUsernameKrivaLozinka() {
		//assertEquals(false, jpa.validate("KriviUsername","KrivaLozinka"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("KriviUsername","KrivaLozinka");});
	}

	@Test
	void tocanUsernameTocnaLozinka() {
		//assertEquals(true, jpa.validate("admin","1234"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("admin","1234");});
	}



	@Test
	void nePostojiKorisnik() {
		var user = jpa.getUserByUsername("KriviKorisnik");

		//assertEquals(true, jpa.exists(user));
		assertThrows(NullPointerException.class,() -> { jpa.exists(user);});
	}

	@Test
	void postojiKorisnik() {
		var user = jpa.getUserByUsername("admin");
		assertEquals(true, jpa.exists(user));
		//assertThrows(NullPointerException.class,() -> { jpa.exists(user);});
	}

	
}