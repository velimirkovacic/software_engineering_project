package vidoje.eventko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidoje.eventko.domain.Event;
import vidoje.eventko.domain.Role;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.domain.User;
import vidoje.eventko.dto.*;
import vidoje.eventko.service.RoleService;
import vidoje.eventko.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;
    @GetMapping("/users")
    public ResponseEntity<UserListResponseDTO> listUsers(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new UserListResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");

        return  ResponseEntity.ok(new UserListResponseDTO("", userService.listAllNotBlocked(userId)));
    }

    @GetMapping("")
    public ResponseEntity<UserInfoResponseDTO> userInfo(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new UserInfoResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");

        return ResponseEntity.ok(new UserInfoResponseDTO("", userService.getUserById(userId)));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponseDTO> destroySession(HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        request.getSession().invalidate();
        return ResponseEntity.ok(new MessageResponseDTO("Uspješna Odjava"));
    }

    @PostMapping("/friend")
    public ResponseEntity<MessageResponseDTO> addFriend(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        User other = userService.getUserById(dto.getUserId());

        if(user.getBlockedBy().contains(other)) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik je blokirao trenutnog"), HttpStatus.BAD_REQUEST);
        }

        if(other.getFriends().contains(user)) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik je već prijatelj trenutnog"), HttpStatus.BAD_REQUEST);

        }

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
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        User other = userService.getUserById(dto.getUserId());

        if(!other.getFriends().contains(user)) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik već nije prijatelj trenutnog"), HttpStatus.BAD_REQUEST);

        }

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
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        User other = userService.getUserById(dto.getUserId());

        if(other.getBlockedBy().contains(user)) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik je već blokirao drugog"), HttpStatus.BAD_REQUEST);
        }


        Set<User> blockedBy = other.getBlockedBy();
        blockedBy.add(user);
        other.setBlockedBy(blockedBy);

        Set<User> userFriends = user.getFriends();
        userFriends.remove(other);
        user.setFriends(userFriends);

        userFriends = other.getFriends();
        userFriends.remove(user);
        other.setFriends(userFriends);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je blokiran"));
    }

    @PostMapping("/suspend")
    public ResponseEntity<MessageResponseDTO> suspendUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        if(!user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet()).contains(3)) {
            return new ResponseEntity<>(new MessageResponseDTO("Samo korisnik s ulogom moderator može suspendirati druge"), HttpStatus.BAD_REQUEST);
        }


        User other = userService.getUserById(dto.getUserId());
        other.setSuspended(true);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je suspendiran"));
    }

    @PostMapping("/unsuspend")
    public ResponseEntity<MessageResponseDTO> unsuspendUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        if(!user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet()).contains(3)) {
            return new ResponseEntity<>(new MessageResponseDTO("Samo korisnik s ulogom moderator može odsuspendirati druge"), HttpStatus.BAD_REQUEST);
        }

        User other = userService.getUserById(dto.getUserId());
        other.setSuspended(false);


        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je odsuspendiran"));
    }

    @PostMapping("/delete")
    public ResponseEntity<MessageResponseDTO> removeUser(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new MessageResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna"), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new MessageResponseDTO("Drugi korisnik s tim ID-jem ne postoji"), HttpStatus.BAD_REQUEST);
        }

        if(!user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet()).contains(4)) {
            return new ResponseEntity<>(new MessageResponseDTO("Samo korisnik s ulogom admin može izbrisati druge"), HttpStatus.BAD_REQUEST);
        }

        userService.delete(dto.getUserId());

        return ResponseEntity.ok(new MessageResponseDTO("Korisnik je izbrisan"));
    }


    @GetMapping("/friends")
    public ResponseEntity<UserListResponseDTO> viewFriends(@Valid @RequestBody UserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new UserListResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new UserListResponseDTO("Drugi korisnik s tim ID-jem ne postoji", null), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(new UserListResponseDTO("", user.getFriends().stream().toList()));
    }

    @PostMapping("/editroles")
    public ResponseEntity<MessageResponseDTO> promoteEvent(@Valid @RequestBody EditRoleUserRequestDTO dto, HttpServletRequest request) {
        if(!request.isRequestedSessionIdValid()) {
            return new ResponseEntity<>(new UserListResponseDTO("Korisnik nije ulogiran i/ili FE-BE sesija nije aktivna", null), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) request.getSession().getAttribute("USER_ID");
        User user = userService.getUserById(userId);

        if(!userService.exists(dto.getUserId())) {
            return new ResponseEntity<>(new UserListResponseDTO("Drugi korisnik s tim ID-jem ne postoji", null), HttpStatus.BAD_REQUEST);
        }

        User other = userService.getUserById(dto.getUserId());

        Set<Long> roleIds = user.getRoles().stream().map(r -> r.getId()).collect(Collectors.toSet());
        if(roleIds.contains(4)) {
            Set<Role> roles = roleService.getRolesFromRoleIds(dto.getRoleIds());

            user.setRoles(roles);
        } else {
            return new ResponseEntity<>(new MessageResponseDTO("Mijenjati uloge drugim korisnicima mogu samo admini"), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(new MessageResponseDTO("Uloge korisnika uspješno izmijenjene"));
    }
}