package com.todo.server.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "REPORTS")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "R_KEY")
    private Long id;

    @Column(name = "R_REASON", nullable = false)
    private String reason;

    @Column(name = "R_REPORTER", nullable = false)
    private String reporter;

    @Column(name = "R_TARGET", nullable = false)
    private String target;
}
