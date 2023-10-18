package com.todo.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.server.model.RatingEntity;
import com.todo.server.model.UserEntity;
import com.todo.server.persistence.RatingRepository;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public void rateUser(UserEntity rater, UserEntity ratedUser, int rating) {
        RatingEntity existingRating = ratingRepository.findByRaterUserAndRatedUser(rater, ratedUser);

        if (existingRating != null) {
            existingRating.setRating(rating);
        } else {
            RatingEntity newRating = RatingEntity.builder()
                    .raterUser(rater)
                    .ratedUser(ratedUser)
                    .rating(rating)
                    .build();
            ratingRepository.save(newRating);
        }
    }

    public double getAverageRating(UserEntity user) {
        List<RatingEntity> ratings = ratingRepository.findByRatedUser(user);
        if (ratings.isEmpty()) {
            return 0.0;
        }

        int totalRating = ratings.stream().mapToInt(RatingEntity::getRating).sum();
        return (double) totalRating / ratings.size();
    }
}
