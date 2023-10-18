package com.todo.server.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.server.model.ReportEntity;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, String> {

}
