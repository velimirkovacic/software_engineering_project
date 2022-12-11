package vidoje.eventko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.*;
import vidoje.eventko.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public ResponseEntity<UserListResponseDTO> listUsers(HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");

        return  ResponseEntity.ok(new UserListResponseDTO(userService.listAllNotBlocked(userId)));
    }

    @GetMapping("")
    public ResponseEntity<UserInfoResponseDTO> userInfo(HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");

        return ResponseEntity.ok(new UserInfoResponseDTO(userService.getUserById(userId)));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponseDTO> destroySession(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok(new MessageResponseDTO("Uspješna Odjava"));
    }

    @PostMapping("/friend")
    public ResponseEntity<MessageResponseDTO> addFriend(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        User other = userService.getUserById(dto.getUserId());
        Set<User> userFriends = user.getFriends();
        userFriends.add(other);
        user.setFriends(userFriends);

        userFriends = other.getFriends();
        userFriends.add(user);
        other.setFriends(userFriends);

        return ResponseEntity.ok(new MessageResponseDTO("Prijateljstvo 2 korisnika dodano"));
    }

    @PostMapping("/unfriend")
    public ResponseEntity<MessageResponseDTO> removeFriend(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        User other = userService.getUserById(dto.getUserId());
        Set<User> userFriends = user.getFriends();
        userFriends.remove(other);
        user.setFriends(userFriends);

        userFriends = other.getFriends();
        userFriends.remove(user);
        other.setFriends(userFriends);

        return ResponseEntity.ok(new MessageResponseDTO("Prijateljstvo 2 korisnika uklonjeno"));
    }

    @PostMapping("/block")
    public ResponseEntity<MessageResponseDTO> blockUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        User other = userService.getUserById(dto.getUserId());
        Set<User> blockedBy = other.getBlockedBy();
        blockedBy.add(user);
        other.setBlockedBy(blockedBy);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je blokiran"));
    }

    @PostMapping("/suspend")
    public ResponseEntity<MessageResponseDTO> suspendUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {

        User other = userService.getUserById(dto.getUserId());
        other.setSuspended(true);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je suspendiran"));
    }

    @PostMapping("/unsuspend")
    public ResponseEntity<MessageResponseDTO> unsuspendUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {

        User other = userService.getUserById(dto.getUserId());
        other.setSuspended(false);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je odsuspendiran"));
    }

    @PostMapping("/delete")
    public ResponseEntity<MessageResponseDTO> removeUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {

        userService.delete(dto.getUserId());

        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je izbrisan"));
    }



    @GetMapping("/friends")
    public ResponseEntity<UserListResponseDTO> viewFriends(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        return ResponseEntity.ok(new UserListResponseDTO(user.getFriends().stream().toList()));
    }
}
