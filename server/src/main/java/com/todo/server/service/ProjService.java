package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.server.model.ProjEntity;
import com.todo.server.persistence.ProjRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProjService {
    private final ProjRepository projRepository;

    @Autowired
    public ProjService(ProjRepository projRepository) {
        this.projRepository = projRepository;
    }

    public List<ProjEntity> getAllProjEntities() {
        return projRepository.findAll();
    }

    public ProjEntity addProjEntity(ProjEntity projEntity) {
        return projRepository.save(projEntity);
    }

    public ProjEntity updateProjEntity(int id, ProjEntity projEntity) {
        Optional<ProjEntity> existingEntity = projRepository.findById(id);
        if (existingEntity.isPresent()) {
            ProjEntity updatedEntity = existingEntity.get();

            if (projEntity.getTitle() != null) {
                updatedEntity.setTitle(projEntity.getTitle());
            }
            if (projEntity.getDesc() != null) {
                updatedEntity.setDesc(projEntity.getDesc());
            }
            if (projEntity.getCate() != null) {
                updatedEntity.setCate(projEntity.getCate());
            }
            if (projEntity.getStack() != null) {
                updatedEntity.setStack(projEntity.getStack());
            }
            if (projEntity.getMember() != null) {
                updatedEntity.setMember(projEntity.getMember());
            }
            if (projEntity.getApplicants() != null) {
                updatedEntity.getApplicants().clear();
                updatedEntity.getApplicants().addAll(projEntity.getApplicants());
            }
            if (projEntity.getRecruitment() != null) {
                updatedEntity.setRecruitment(projEntity.getRecruitment());
            }
            if (projEntity.getQuestion() != null) {
                updatedEntity.setQuestion(projEntity.getQuestion());
            }
            if (projEntity.getRecdate() != null) {
                updatedEntity.setRecdate(projEntity.getRecdate());
            }
            if (projEntity.getCreatedate() != null) {
                updatedEntity.setCreatedate(projEntity.getCreatedate());
            }
            if (projEntity.isStatus()) {
                updatedEntity.setStatus(projEntity.isStatus());
            }
            if (!projEntity.isStatus()) {
                updatedEntity.setStatus(projEntity.isStatus());
            }

            return projRepository.save(updatedEntity);
        }
        return null;
    }

    public boolean deleteProjEntity(int id) {
        Optional<ProjEntity> existingEntity = projRepository.findById(id);
        if (existingEntity.isPresent()) {
            projRepository.delete(existingEntity.get());
            return true;
        }
        return false;
    }
}
