package com.todo.server.persistence;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.server.model.RatingEntity;
import com.todo.server.model.UserEntity;

@Repository
public interface RatingRepository extends JpaRepository<RatingEntity, String> {
    List<RatingEntity> findByRatedUser(UserEntity user);

    RatingEntity findByRaterUserAndRatedUser(UserEntity raterUser, UserEntity ratedUser);
}
