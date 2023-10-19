package com.todo.server.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.server.model.ChatEntity;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    List<ChatEntity> findByMembersContaining(String member);
}
