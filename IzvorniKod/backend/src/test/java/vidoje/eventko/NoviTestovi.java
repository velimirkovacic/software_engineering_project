package vidoje.eventko;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.impl.UserServiceJpa;

import org.springframework.stereotype.Service;
import vidoje.eventko.domain.User;
import vidoje.eventko.service.UserService;

@SpringBootTest
class NoviTestovi {

	User user;

	@BeforeAll
	static void setUpBeforeClass(){
		System.out.println("Početak testiranja");		
	}

	@AfterAll
	static void tearDownAfterClass(){
		System.out.println("Kraj testiranja");
	}

	@BeforeEach
	void setUp() throws Exception {
		user = new User();
        user.setNickname("Testic");
        user.setEmail(null);
        user.setSuspended(true);
	}	
	
	
	@Test 
	void bezIcegaLozinka() {
		Throwable exception = assertThrows(NullPointerException.class, () -> {user.setPassword(null);});
	}



    @Test 
	void dobarNadimak() {
		assertEquals("Testic", user.getNickname());
	}

    @Test 
	void suspendiranKorisnik() {
		assertEquals(true, user.getSuspended());
	}

    @Test 
	void krivaDuljinaUsername() {
		Throwable exception = assertThrows(IllegalArgumentException.class, () -> user.setUsername("A"));		
	}

	
}
