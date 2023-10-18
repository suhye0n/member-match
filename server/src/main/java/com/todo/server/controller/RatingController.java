package com.todo.server.controller;

import com.todo.server.dto.RatingDTO;
import com.todo.server.model.UserEntity;
import com.todo.server.persistence.UserRepository;
import com.todo.server.service.RatingService;
import com.todo.server.service.UserService;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    private final RatingService ratingService;
    private final UserRepository userRepository;

    @Autowired
    public RatingController(RatingService ratingService, UserRepository userRepository) {
        this.ratingService = ratingService;
        this.userRepository = userRepository;
    }

    @PostMapping("/rate")
    public ResponseEntity<?> rateUser(@RequestBody RatingDTO ratingDTO) {
        try {
            UserEntity raterUser = getUserEntityFromDTO(ratingDTO.getRaterUserId());
            UserEntity ratedUser = getUserEntityFromDTO(ratingDTO.getRatedUserId());
            int rating = ratingDTO.getRating();

            ratingService.rateUser(raterUser, ratedUser, rating);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/average/{userId}")
    public ResponseEntity<?> getAverageRating(@PathVariable String userId) {
        try {
            UserEntity user = getUserEntityFromDTO(userId);
            double averageRating = ratingService.getAverageRating(user);

            return ResponseEntity.ok(averageRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private UserEntity getUserEntityFromDTO(String userId) {
        return getUserEntityById(userId);
    }

    private UserEntity getUserEntityById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
    }
}
