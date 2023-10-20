package com.todo.server.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.server.model.ProjEntity;
import java.util.List;

@Repository
public interface ProjRepository extends JpaRepository<ProjEntity, Integer> {
    List<ProjEntity> findAll();
}
