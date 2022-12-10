package vidoje.eventko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.MessageResponseDTO;
import vidoje.eventko.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("")
    public List<User> listUsers() {
        return userService.listAll();
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponseDTO> destroySession(HttpServletRequest request) {
        System.out.println(request.getSession());
        request.getSession().invalidate();
        return ResponseEntity.ok(new MessageResponseDTO("Uspješna Odjava"));
    }
}
