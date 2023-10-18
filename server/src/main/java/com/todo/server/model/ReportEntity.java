package com.todo.server.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "reports")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "R_KEY")
    private Long id;

    @Column(name = "R_REASON", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "R_REPORTER", nullable = false, columnDefinition = "TEXT")
    private String reporter;

    @Column(name = "R_TARGET", nullable = false, columnDefinition = "TEXT")
    private String target;
}
