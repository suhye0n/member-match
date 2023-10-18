package com.todo.server.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public void deleteReport(Long reportId) {
        Optional<ReportEntity> optionalReportEntity = reportRepository.findById(reportId);
        if (optionalReportEntity.isPresent()) {
            reportRepository.delete(optionalReportEntity.get());
        } else {
            throw new RuntimeException("Report not found for id: " + reportId);
        }
    }
    
    public List<ReportDTO> getAllReports() {
        List<ReportEntity> reportEntities = reportRepository.findAll();
        return reportEntities.stream()
                .map(reportEntity -> {
                    ReportDTO reportDTO = new ReportDTO();
                    reportDTO.setId(reportEntity.getId());
                    reportDTO.setReason(reportEntity.getReason());
                    reportDTO.setReporter(reportEntity.getReporter());
                    reportDTO.setTarget(reportEntity.getTarget());
                    return reportDTO;
                })
                .collect(Collectors.toList());
    }
}
