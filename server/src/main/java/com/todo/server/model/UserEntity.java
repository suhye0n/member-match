package com.todo.server.model;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import org.hibernate.annotations.GenericGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS", uniqueConstraints = {@UniqueConstraint(columnNames = "U_EMAIL"), @UniqueConstraint(columnNames = "U_NAME")})
public class UserEntity {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "U_ID")
    private String id;

    @Column(name = "U_NAME", nullable = false)
    private String username;

    @Column(name = "U_EMAIL", nullable = false)
    private String email;

    @Column(name = "U_LOCATION")
    private String location;

    @Column(name = "U_PW", nullable = false)
    private String password;

    @Column(name = "U_STATE")
    private Date state;
}