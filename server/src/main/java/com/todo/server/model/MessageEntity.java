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
@Table(name = "messages")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "M_ID")
    private Long id;

    @Column(name = "M_TEXT", columnDefinition = "TEXT")
    private String text;

    @Column(name = "M_SENDER", nullable = false)
    private String sender;

    @Column(name = "M_TIMESTAMP", nullable = false)
    private Date timestamp;

    @Column(name = "M_UNREAD", nullable = false)
    @ElementCollection
    private List<String> unreadMembers;
}
