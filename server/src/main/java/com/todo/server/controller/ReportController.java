package com.todo.server.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.todo.server.dto.ReportDTO;
import com.todo.server.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReport(@RequestBody ReportDTO reportDTO) {
        try {
            reportService.createReport(reportDTO);
            return new ResponseEntity<>("신고 생성 성공:", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("신고 생성 실패: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable Long reportId) {
        try {
            reportService.deleteReport(reportId);
            return new ResponseEntity<>("신고 삭제 성공: ", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("신고 삭제 실패: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<ReportDTO>> getAllReports() {
        try {
            List<ReportDTO> reports = reportService.getAllReports();
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<ReportDTO>(), HttpStatus.BAD_REQUEST);
        }
    }
}
