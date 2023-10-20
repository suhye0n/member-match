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
@Table(name = "CHATS")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_ID")
    private Long id;

    @Column(name = "C_NAME", nullable = false)
    private String name;

    @ElementCollection
    @CollectionTable(name = "CHATS_MEMBER", joinColumns = @JoinColumn(name = "C_ID"))
    @Column(name = "C_MEMBERS", nullable = false)
    private List<String> members;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "C_MESSAGES")
    private List<MessageEntity> messages;

    @Column(name = "C_KEY", nullable = false)
    private String key;
}
