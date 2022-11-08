package vidoje.eventko.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.dto.LoginRequestDTO;
import vidoje.eventko.dto.LoginResponseDTO;
import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.UserService;
import vidoje.eventko.service.impl.UserServiceJpa;

import javax.validation.Valid;

@RestController
@RequestMapping("/login")
//@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    @Autowired
    public UserService userService;

    @PostMapping("")
    public ResponseEntity<?> performLogin(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {

        if (userService.validate(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())) {

             return ResponseEntity.ok(new LoginResponseDTO("Uspješna prijava"));
        }
        return new ResponseEntity<LoginResponseDTO>(new LoginResponseDTO("Neuspješna prijava"), HttpStatus.UNAUTHORIZED);
    }
}
