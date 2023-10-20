package com.todo.server.controller;

import com.todo.server.model.ChatEntity;
import com.todo.server.model.MessageEntity;
import com.todo.server.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public List<ChatEntity> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{id}")
    public ChatEntity getChat(@PathVariable Long id) {
        return chatService.getChatById(id).orElse(null);
    }

    @PostMapping
    public ChatEntity createChat(@RequestBody ChatEntity chat) {
        return chatService.createChat(chat);
    }
    
    @PostMapping("/{id}/messages")
    public ResponseEntity<ChatEntity> addMessageToChat(@PathVariable Long id, @RequestBody MessageEntity message) {
        ChatEntity chat = chatService.getChatById(id).orElse(null);

        if (chat != null) {
            List<MessageEntity> messages = chat.getMessages();
            if (messages == null) {
                messages = new ArrayList<>();
            }

            message.setUnreadMembers(new ArrayList<>(chat.getMembers()));
            message.getUnreadMembers().remove(message.getSender());

            messages.add(message);
            chat.setMessages(messages);
            chatService.updateChat(id, chat);
            return ResponseEntity.ok(chat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{key}")
    public ResponseEntity<ChatEntity> updateChat(@PathVariable("key") String key, @RequestBody ChatEntity updatedChat) {
        ChatEntity chat = chatService.patchChat(key, updatedChat);

        if (chat != null) {
            return ResponseEntity.ok(chat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{chatId}/messages/{messageId}/read/{memberName}")
    public ResponseEntity<ChatEntity> markMessageAsRead(
        @PathVariable Long chatId, 
        @PathVariable Long messageId,
        @PathVariable String memberName) {
        
        ChatEntity chat = chatService.getChatById(chatId).orElse(null);

        if (chat != null) {
            List<MessageEntity> messages = chat.getMessages();

            if (messages != null) {
                for (MessageEntity message : messages) {
                    if (message.getId().equals(messageId)) {
                        message.getUnreadMembers().remove(memberName);
                        break;
                    }
                }

                chat.setMessages(messages);
                chatService.updateChat(chatId, chat);
                return ResponseEntity.ok(chat);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void deleteChat(@PathVariable Long id) {
        chatService.deleteChat(id);
    }
}
