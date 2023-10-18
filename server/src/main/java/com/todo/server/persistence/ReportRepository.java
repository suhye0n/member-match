package com.todo.server.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.server.model.ReportEntity;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    ReportEntity findByReporter(String reporter);

    Optional<ReportEntity> findById(Long id);
}
