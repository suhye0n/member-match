package com.todo.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
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
@Table(name = "CALENDARS")
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_ID")
    private Long id;

    @Column(name = "C_TITLE", nullable = false)
    private String title;

    @Column(name = "C_DESC")
    private String description;

    @Column(name = "C_START", nullable = false)
    private Date start;

    @Column(name = "C_END", nullable = false)
    private Date end;

    @Column(name = "C_KEY", nullable = false)
    private String projectKey;

    @Column(name = "C_CREATOR", nullable = false)
    private String creator;
}
