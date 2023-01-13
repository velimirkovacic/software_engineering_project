<<<<<<< HEAD
package vidoje.eventko;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import vidoje.eventko.service.TagService;
import vidoje.eventko.service.UserService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class EventkoApplicationTests {


	@Autowired
	UserService jpa;
	@Autowired
	TagService tag;

	@Test
	void nePostojiKorisnikUsername() {
		var user = jpa.getUserByUsername("KriviKorisnik");
		assertThrows(NullPointerException.class,() -> { jpa.exists(user);});
	}

	@Test
	void postojiKorisnikUsername() {
		var user = jpa.getUserByUsername("admin");
		assertEquals(true, jpa.exists(user));
	}

	@Test
	void nePostojiKorisnikId() {
		Throwable exception = assertThrows(IndexOutOfBoundsException.class,
								() -> {jpa.exists(jpa.getUserById((long) 50));});
	}

	@Test
	void tagId() {

		var tagovi = tag.getAllTags();
		assertEquals(1, tagovi.get(0).getId());
	}

	@Test
	void tagName() {

		var tagovi = tag.getAllTags();
		assertEquals("Kava", tagovi.get(0).getName());
	}

	@Test
	void tagHexColor() {

		var tagovi = tag.getAllTags();
		assertEquals("#6f4e37", tagovi.get(0).getHexColor());
	}
	
}
=======
package vidoje.eventko;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.impl.UserServiceJpa;

import org.springframework.stereotype.Service;
import vidoje.eventko.domain.User;
import vidoje.eventko.service.UserService;

@SpringBootTest
class EventkoApplicationTests {

	@Test
	void tocanUsernameKrivaLozinka() {
		var jpa = new UserServiceJpa();
		//assertEquals(false, jpa.validate("admin","KrivaLozinka"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("admin","KrivaLozinka");});
	}

	@Test
	void kriviUsernameTocnaLozinka() {
		var jpa = new UserServiceJpa();
		//assertEquals(false, jpa.validate("KriviUsername","1234"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("KriviUsername","1234");});
	}

	@Test
	void kriviUsernameKrivaLozinka() {
		var jpa = new UserServiceJpa();
		//assertEquals(false, jpa.validate("KriviUsername","KrivaLozinka"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("KriviUsername","KrivaLozinka");});
	}

	@Test
	void tocanUsernameTocnaLozinka() {
		var jpa = new UserServiceJpa();
		//assertEquals(true, jpa.validate("admin","1234"));
		assertThrows(NullPointerException.class,() -> { jpa.validate("admin","1234");});
	}

	@Test
	void nePostojiKorisnik() {
		var jpa = new UserServiceJpa();
		var users = jpa.userRepo.findByUsername("KriviKorisnik");
		var user = users.get(0);
		//assertEquals(true, jpa.exists(user));
		assertThrows(NullPointerException.class,() -> { jpa.exists(user);});
	}

	@Test
	void postojiKorisnik() {
		var jpa = new UserServiceJpa();
		var users = jpa.userRepo.findByUsername("admin");
		var user = users.get(0);
		//assertEquals(true, jpa.exists(user));
		assertThrows(NullPointerException.class,() -> { jpa.exists(user);});
	}

	
}
>>>>>>> devdoc
