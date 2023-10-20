package com.todo.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.todo.server.model.ProjEntity;
import com.todo.server.service.ProjService;
import java.util.List;

@RestController
@RequestMapping("/proj")
public class ProjController {
    private final ProjService projService;

    @Autowired
    public ProjController(ProjService projService) {
        this.projService = projService;
    }

    @GetMapping("/all")
    public List<ProjEntity> getAllProjects() {
        return projService.getAllProjEntities();
    }

    @PostMapping("/add")
    public ProjEntity addProject(@RequestBody ProjEntity projEntity) {
        return projService.addProjEntity(projEntity);
    }

    @PutMapping("/update/{id}")
    public ProjEntity updateProject(@PathVariable int id, @RequestBody ProjEntity projEntity) {
        return projService.updateProjEntity(id, projEntity);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable int id) {
        boolean deleted = projService.deleteProjEntity(id);
        if (deleted) {
            return ResponseEntity.ok("프로젝트 삭제 성공");
        } else {
            return ResponseEntity.badRequest().body("프로젝트를 찾을 수 없음");
        }
    }
}
