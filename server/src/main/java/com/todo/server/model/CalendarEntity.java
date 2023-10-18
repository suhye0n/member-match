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
@Table(name = "calendar")
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CAL_ID")
    private Long id;

    @Column(name = "CAL_TITLE", nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(name = "CAL_DESC", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "CAL_START", nullable = false, columnDefinition = "TEXT")
    private Date start;

    @Column(name = "CAL_END", nullable = false, columnDefinition = "TEXT")
    private Date end;

    @Column(name = "CAL_KEY", nullable = false, columnDefinition = "TEXT")
    private String projectKey;

    @Column(name = "CAL_CREATOR", nullable = false, columnDefinition = "TEXT")
    private String creator;
}
