package com.todo.server.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "NOTIFICATIONS")
public class NotificationEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "N_ID", nullable = false)
    private Long id;

    @Column(name = "C_USERNAME", nullable = false)
    private String username;

    @Column(name = "C_TEXT", nullable = false)
    private String text;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "C_DATE", nullable = false)
    private Date date;

    @Column(name = "C_READ", nullable = false)
    private boolean read;
}
