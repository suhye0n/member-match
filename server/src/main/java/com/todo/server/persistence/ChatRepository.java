package com.todo.server.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.todo.server.model.ChatEntity;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    List<ChatEntity> findByMembersContaining(String member);

    @Query("SELECT c FROM ChatEntity c WHERE c.key = :key")
    ChatEntity findByKey(@Param("key") String key);
}
