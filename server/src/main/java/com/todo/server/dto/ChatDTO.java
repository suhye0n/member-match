package com.todo.server.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private String id;
    private String name;
    private List<String> members;
    private List<MessageDTO> messages;
}
