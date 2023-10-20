package com.todo.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MESSAGES")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "M_ID", nullable = false)
    private Long id;

    @Column(name = "M_TEXT", nullable = false)
    private String text;

    @Column(name = "M_SENDER", nullable = false)
    private String sender;

    @Column(name = "M_TIMESTAMP", nullable = false)
    private Date timestamp;

    @ElementCollection
    @CollectionTable(name = "MESSAGES_UNREAD")
    @Column(name = "U_MEMBER")
    private List<String> unreadMembers;
}
