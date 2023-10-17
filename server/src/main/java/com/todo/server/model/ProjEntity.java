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

    @Convert(converter = MemberConverter.class) // Define the custom converter here
    private List<Map<String, String>> member;

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

    @Temporal(TemporalType.TIMESTAMP)
    @ColumnDefault("CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedate;

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
