package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.server.model.ProjEntity;
import com.todo.server.persistence.ProjRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
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
            updatedEntity.setTitle(projEntity.getTitle());
            updatedEntity.setDesc(projEntity.getDesc());
            updatedEntity.setCate(projEntity.getCate());
            updatedEntity.setStack(projEntity.getStack());
            updatedEntity.setMember(projEntity.getMember());
            updatedEntity.setApplicants(projEntity.getApplicants());
            updatedEntity.setRecruitment(projEntity.getRecruitment());
            updatedEntity.setQuestion(projEntity.getQuestion());
            updatedEntity.setRecdate(projEntity.getRecdate());
            updatedEntity.setCreatedate(projEntity.getCreatedate());
            updatedEntity.setStatus(projEntity.isStatus());
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
