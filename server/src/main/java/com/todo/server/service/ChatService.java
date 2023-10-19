package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.server.model.ChatEntity;
import com.todo.server.persistence.ChatRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ChatService {
    private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public List<ChatEntity> getAllChats() {
        return chatRepository.findAll();
    }

    public Optional<ChatEntity> getChatById(Long id) {
        return chatRepository.findById(id);
    }

    public ChatEntity createChat(ChatEntity chat) {
        return chatRepository.save(chat);
    }

    public ChatEntity updateChat(Long id, ChatEntity updatedChat) {
        ChatEntity existingChat = chatRepository.findById(id)
                .orElse(null);

        if (existingChat != null) {
            if (updatedChat.getName() != null) {
                existingChat.setName(updatedChat.getName());
            }

            if (updatedChat.getMembers() != null) {
                existingChat.setMembers(updatedChat.getMembers());
            }

            if (updatedChat.getMessages() != null) {
                existingChat.setMessages(updatedChat.getMessages());
            }

            return chatRepository.save(existingChat);
        }

        return null;
    }

    public void deleteChat(Long id) {
        chatRepository.deleteById(id);
    }

    public List<ChatEntity> getChatsByMember(String member) {
        return chatRepository.findByMembersContaining(member);
    }
}
