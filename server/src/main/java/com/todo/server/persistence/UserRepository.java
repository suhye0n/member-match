package com.todo.server.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.server.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByEmail(String email);
    Optional<UserEntity> findUserById(String id);
    Optional<UserEntity> findById(String id);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    UserEntity findByEmailAndPassword(String email, String password);
    UserEntity findByUsername(String username);
}
