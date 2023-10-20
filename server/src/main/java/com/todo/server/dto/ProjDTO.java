package com.todo.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjDTO {
    private int key;
    private String title;
    private String desc;
    private String cate;
    private String[] stack;
    private int reckey;
    private List<Map<String, String>> member;
    private List<Map<String, Object>> applicants;
    private List<String> question;
    private Date recdate;
    private Date createdate;
    private boolean status;
}
