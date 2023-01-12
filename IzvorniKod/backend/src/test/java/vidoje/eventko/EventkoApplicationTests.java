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