package vidoje.eventko.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.LoginRequestDTO;
import vidoje.eventko.dto.LoginResponseDTO;
import vidoje.eventko.repos.UserRepo;
import vidoje.eventko.service.UserService;
import vidoje.eventko.service.impl.UserServiceJpa;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/login")
@Controller
//@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    @Autowired
    public UserService userService;

    @PostMapping("")
    public ResponseEntity<LoginResponseDTO> performLogin(@Valid @RequestBody LoginRequestDTO loginRequestDTO, HttpSession session) throws NoSuchAlgorithmException, InvalidKeySpecException {
        if (userService.validate(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())) {
            User user = userService.getUserByUsername(loginRequestDTO.getUsername());
            session.setAttribute("USER_ID", Long.valueOf(user.getId()));
            return ResponseEntity.ok(new LoginResponseDTO("Uspješna prijava", user));
        }
        return new ResponseEntity<>(new LoginResponseDTO("Neuspješna prijava", null), HttpStatus.UNAUTHORIZED);
    }
}
