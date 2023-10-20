package com.todo.server.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(name = "PROJS")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "P_KEY", nullable = false)
    private int key;

    @Column(name = "P_TITLE", nullable = false)
    private String title;
    
    @Column(name = "P_DESC")
    private String desc;
    
    @Column(name = "P_CATE")
    private String cate;

    @ElementCollection
    @CollectionTable(name = "PROJS_STACK", joinColumns = @JoinColumn(name = "proj_id"))
    @Column(name = "P_STACK")
    private List<String> stack;

    @Column(name = "P_RECKEY")
    private int reckey;

    @Convert(converter = MemberConverter.class)
    @Column(name = "P_MEMBER", nullable = false)
    private List<Map<String, String>> member;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "P_ID")
    private List<ApplicantInfoEntity> applicants;

    @ElementCollection
    @CollectionTable(name = "PROJS_QUESTIOM", joinColumns = @JoinColumn(name = "P_ID"))
    private List<String> question;

    @ElementCollection
    @CollectionTable(name = "PROJS_RECRUIT", joinColumns = @JoinColumn(name = "P_ID"))
    @MapKeyColumn(name = "job_position")
    @Column(name = "P_RECRUIT")
    private Map<String, Integer> recruitment;

    @Column(name = "P_RECDATE")
    private Date recdate;

    @Temporal(TemporalType.TIMESTAMP)
    @ColumnDefault("CURRENT_TIMESTAMP")
    @CreationTimestamp
    @Column(name = "P_CREATED")
    private Date createdate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    @Column(name = "P_UPDATED")
    private Date updatedate;

    @Column(name = "P_STATUS")
    private boolean status;

    @Entity
    @Table(name = "PROJS_APPLICANT")
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApplicantInfoEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "A_ID", nullable = false)
        private int id;

        @Column(name = "A_NAME", nullable = false)
        private String name;

        @Column(name = "A_POSITION", nullable = false)
        private String position;

        @ElementCollection
        @CollectionTable(name = "PROJS_ANSWER", joinColumns = @JoinColumn(name = "A_ID"))
        private List<String> answers;
    }

    @Converter(autoApply = true)
    public static class MemberConverter implements AttributeConverter<List<Map<String, String>>, String> {
        @Override
        public String convertToDatabaseColumn(List<Map<String, String>> attribute) {
            if (attribute == null || attribute.isEmpty()) {
                return null;
            }

            StringBuilder memberString = new StringBuilder();
            for (Map<String, String> member : attribute) {
                memberString.append(member.get("name")).append(":").append(member.get("position")).append(",");
            }
            return memberString.toString();
        }

        @Override
        public List<Map<String, String>> convertToEntityAttribute(String dbData) {
            List<Map<String, String>> members = new ArrayList<>();
            if (dbData == null || dbData.isEmpty()) {
                return members;
            }

            String[] memberStrings = dbData.split(",");
            for (String memberString : memberStrings) {
                String[] parts = memberString.split(":");
                if (parts.length == 2) {
                    Map<String, String> member = new HashMap<>();
                    member.put("name", parts[0]);
                    member.put("position", parts[1]);
                    members.add(member);
                }
            }
            return members;
        }
    }
}
