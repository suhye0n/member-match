package com.todo.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "proj")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "P_KEY")
    private int key;

    private String title;
    private String desc;
    private String cate;

    @ElementCollection
    @CollectionTable(name = "proj_stack", joinColumns = @JoinColumn(name = "proj_id"))
    private List<String> stack;

    private int reckey;

    @ElementCollection
    @CollectionTable(name = "proj_member", joinColumns = @JoinColumn(name = "proj_id"))
    private List<String> member;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "proj_id")
    private List<ApplicantInfoEntity> applicants;

    @ElementCollection
    @CollectionTable(name = "proj_question", joinColumns = @JoinColumn(name = "proj_id"))
    private List<String> question;

    @ElementCollection
    @CollectionTable(name = "proj_recruitment", joinColumns = @JoinColumn(name = "proj_id"))
    @MapKeyColumn(name = "job_position")
    @Column(name = "number_of_positions")
    private Map<String, Integer> recruitment;

    private Date recdate;
    private Date createdate;
    private boolean status;

    @Entity
    @Table(name = "applicant_info")
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApplicantInfoEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String name;
        private String position;

        @ElementCollection
        @CollectionTable(name = "applicant_answers", joinColumns = @JoinColumn(name = "applicant_id"))
        private List<String> answers;
    }
}
