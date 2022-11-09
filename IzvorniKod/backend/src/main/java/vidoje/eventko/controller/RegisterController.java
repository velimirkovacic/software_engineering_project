package vidoje.eventko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.RegisterRequestDTO;
import vidoje.eventko.dto.RegisterResponseDTO;
import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.UserService;
import vidoje.eventko.service.impl.UserServiceJpa;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/register")
//@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    @Autowired
    public UserService userService;

    @PostMapping("")
    public ResponseEntity<RegisterResponseDTO> performRegister(@Valid @RequestBody RegisterRequestDTO dto) throws NoSuchAlgorithmException, InvalidKeySpecException {

        User newUser = new User(dto.getUsername(), dto.getEmail(), dto.getNickname(), dto.getPassword());
        try {
            if(userService.exists(newUser)) {
                return new ResponseEntity<RegisterResponseDTO>(new RegisterResponseDTO("Korisnik s tim e-mailom ili korisničkim imenom već postoji"), HttpStatus.BAD_REQUEST);
            } else {
                userService.add(newUser);
                return ResponseEntity.ok(new RegisterResponseDTO("Uspješna registracija"));
            }
        } catch(Exception ex) {
            return new ResponseEntity<RegisterResponseDTO>(new RegisterResponseDTO("Neuspješna registracija, nepoznata pogreška"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}