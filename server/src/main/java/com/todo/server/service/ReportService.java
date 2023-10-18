package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.server.persistence.ReportRepository;
import com.todo.server.dto.ReportDTO;
import com.todo.server.model.ReportEntity;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public void createReport(ReportDTO reportDTO) {
        ReportEntity reportEntity = new ReportEntity();
        reportEntity.setReason(reportDTO.getReason());
        reportEntity.setReporter(reportDTO.getReporter());
        reportEntity.setTarget(reportDTO.getTarget());

        reportRepository.save(reportEntity);
    }

    public void deleteReport(String reportId) {
        reportRepository.deleteById(reportId);
    }
}
