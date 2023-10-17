package com.todo.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.todo.server.dto.ResponseDTO;
import com.todo.server.dto.UserDTO;
import com.todo.server.model.UserEntity;
import com.todo.server.security.TokenProvider;
import com.todo.server.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
	    try {
	        if (userService.existsByEmail(userDTO.getEmail())) {
	            throw new Exception("이미 가입된 이메일 주소입니다.");
	        }

	        UserEntity user = UserEntity.builder()
	                .email(userDTO.getEmail())
	                .username(userDTO.getUsername())
	                .password(passwordEncoder.encode(userDTO.getPassword()))
	                .location(userDTO.getLocation())
	                .build();

	        UserEntity registeredUser = userService.create(user);
	        UserDTO responseUserDTO = UserDTO.builder()
	                .email(registeredUser.getEmail())
	                .id(registeredUser.getId())
	                .username(registeredUser.getUsername())
	                .location(registeredUser.getLocation())
	                .build();
	        return ResponseEntity.ok().body(responseUserDTO);
	    } catch (Exception e) {
	        ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
	        return ResponseEntity.badRequest().body(responseDTO);
	    }
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
	    try {
	        UserEntity user = userService.getByCredentials(
	                userDTO.getEmail(),
	                userDTO.getPassword(),
	                passwordEncoder);

	        if (user == null) {
	            throw new Exception("Login failed");
	        }

	        final String token = tokenProvider.create(user);
	        final UserDTO responseUserDTO = UserDTO.builder()
	                .email(user.getEmail())
	                .id(user.getId())
	                .username(user.getUsername())
	                .token(token)
	                .location(user.getLocation())
	                .build();

	        return ResponseEntity.ok().body(responseUserDTO);
	    } catch (Exception e) {
	        ResponseDTO responseDTO = ResponseDTO.builder()
	                .error(e.getMessage())
	                .build();
	        return ResponseEntity.badRequest().body(responseDTO);
	    }
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {
	    try {
	        String userId = userService.getUser(userDTO.getEmail().toString()).getId();

	        UserEntity updatedUser = UserEntity.builder()
	                .id(userId)
	                .email(userDTO.getEmail())
	                .username(userDTO.getUsername())
	                .location(userDTO.getLocation())
	                .password(passwordEncoder.encode(userDTO.getPassword()))
	                .build();

	        userService.updateUser(updatedUser);

	        UserDTO responseUserDTO = UserDTO.builder()
	                .email(updatedUser.getEmail())
	                .id(updatedUser.getId())
	                .username(updatedUser.getUsername())
	                .location(updatedUser.getLocation())
	                .build();

	        return ResponseEntity.ok().body(responseUserDTO);
	    } catch (Exception e) {
	        ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
	        return ResponseEntity.badRequest().body(responseDTO);
	    }
	}

	@DeleteMapping("/withdrawal")
	public ResponseEntity<?> deleteUser(@RequestBody UserDTO userDTO) {
	    try {
	        boolean deleted = userService.deleteUser(
	                userDTO.getEmail(), 
	                userDTO.getPassword(), 
	                passwordEncoder);

	        if (!deleted) {
	            throw new Exception("Invalid email or password");
	        }

	        return ResponseEntity.ok().body(ResponseDTO.builder().message("Successfully deleted user").build());
	    } catch (Exception e) {
	        ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
	        return ResponseEntity.badRequest().body(responseDTO);
	    }
	}
	
	@GetMapping("/find/{email}")
    public ResponseEntity<?> findUserIdByEmail(@PathVariable String email) {
        try {
            String userId = userService.getUserIdByEmail(email);

            if (userId != null) {
                return ResponseEntity.ok(Map.of("id", userId));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
	
	@PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestParam String id, @RequestParam String newPassword) {
        try {
            UserEntity user = userService.getUserById(id);

            if (user != null) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userService.updateUser(user);
                return ResponseEntity.ok(ResponseDTO.builder().message("Password updated successfully").build());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
	
	@GetMapping("/checkUsername/{username}")
	public ResponseEntity<?> checkUsername(@PathVariable String username) {
	    boolean usernameExists = userService.existsByUsername(username);

	    if (usernameExists) {
	        return ResponseEntity.ok(Map.of("exists", true));
	    } else {
	        return ResponseEntity.ok(Map.of("exists", false));
	    }
	}
	
	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<?> checkEmail(@PathVariable String email) {
	    boolean emailExists = userService.existsByEmail(email);

	    if (emailExists) {
	        return ResponseEntity.ok(Map.of("exists", true));
	    } else {
	        return ResponseEntity.ok(Map.of("exists", false));
	    }
	}
}