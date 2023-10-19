package com.todo.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chats")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_ID")
    private Long id;

    @Column(name = "C_NAME", nullable = false, columnDefinition = "TEXT")
    private String name;

    @ElementCollection
    @CollectionTable(name = "chat_members", joinColumns = @JoinColumn(name = "chat_id"))
    private List<String> members;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private List<MessageEntity> messages;

    @Column(name = "C_KEY", nullable = false, columnDefinition = "TEXT")
    private String key;
}
