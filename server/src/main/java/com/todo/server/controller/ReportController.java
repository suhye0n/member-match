package com.todo.server.controller;

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
            return new ResponseEntity<>("Report created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Report creation failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable String reportId) {
        try {
            reportService.deleteReport(reportId);
            return new ResponseEntity<>("Report deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Report deletion failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
