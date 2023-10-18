package com.todo.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingDTO {
    private String raterUserId;
    private String ratedUserId;
    private int rating;
}
