package com.todo.server.controller;

import com.todo.server.dto.RatingDTO;
import com.todo.server.model.UserEntity;
import com.todo.server.persistence.UserRepository;
import com.todo.server.service.RatingService;
import java.util.Optional;
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
            UserEntity raterUser = getUserEntityFromDTO(ratingDTO.getRaterUsername());
            UserEntity ratedUser = getUserEntityFromDTO(ratingDTO.getRatedUsername());
            int rating = ratingDTO.getRating();

            ratingService.rateUser(raterUser, ratedUser, rating);

            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/average/{username}")
    public ResponseEntity<?> getAverageRating(@PathVariable String username) {
        try {
            UserEntity user = getUserEntityFromDTO(username);
            double averageRating = ratingService.getAverageRating(user);

            return ResponseEntity.ok(averageRating);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    private UserEntity getUserEntityFromDTO(String username) {
        Optional<UserEntity> userEntityOptional = getUserEntityByUsername(username);
        return userEntityOptional.orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없음: " + username));
    }

    private Optional<UserEntity> getUserEntityByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }
}
