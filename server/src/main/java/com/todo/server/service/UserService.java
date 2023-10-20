package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.server.model.UserEntity;
import com.todo.server.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity create(final UserEntity userEntity) {
        if (userEntity == null || userEntity.getEmail() == null || userEntity.getUsername() == null) {
            throw new RuntimeException("이메일 또는 닉네임에 null이 들어갈 수 없음");
        }

        final String email = userEntity.getEmail();
        final String username = userEntity.getUsername();

        if (userRepository.existsByUsername(username)) {
            log.warn("닉네임 중복: {}", username);
            throw new RuntimeException("닉네임 중복");
        }

        if (existsByEmail(email)) {
            log.warn("이메일 중복: {}", email);
            throw new RuntimeException("이메일 중복");
        }

        return userRepository.save(userEntity);
    }

    public UserEntity getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
        final UserEntity originalUser = userRepository.findByEmail(email);

        if (originalUser != null &&
                encoder.matches(password,
                        originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }

    public boolean deleteUser(final String email, final String password, final PasswordEncoder encoder) {
        final UserEntity user = userRepository.findByEmail(email);
        if (user != null && encoder.matches(password, user.getPassword())) {
            userRepository.delete(user);
            return true;
        }
        return false;
    }

    public UserEntity getUser(final String email) {
        return userRepository.findByEmail(email);
    }

    public void updateUser(final UserEntity userEntity) {
        userRepository.save(userEntity);
    }
    
    public String getUserIdByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email);

        if (user != null) {
            return user.getId();
        } else {
            log.warn("사용자를 찾을 수 없음: {}", email);
            return null;
        }
    }
    
    public UserEntity getUserById(String id) {
        return userRepository.findUserById(id).orElse(null);
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public UserEntity getUserByNickname(String nickname) {
        return userRepository.findByUsername(nickname);
    }
}
