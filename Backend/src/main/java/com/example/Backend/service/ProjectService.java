package com.example.Backend.service;

import com.example.Backend.dto.ProjectRequest;
import com.example.Backend.model.Project;
import com.example.Backend.model.ProjectStatus;
import com.example.Backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(Project project) {
        if (project.getName() == null || project.getName().trim().isEmpty()) {
            throw new RuntimeException("Project name is required");
        }
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    public Project updateProject(Long id, ProjectRequest req) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        if (req.getName() != null && !req.getName().trim().isEmpty()) {
            project.setName(req.getName());
        }

        if (req.getDescription() != null && !req.getDescription().trim().isEmpty()) {
            project.setDescription(req.getDescription());
        }

        return projectRepository.save(project);
    }

    public List<Project> getProjectsByCreator(Long createdBy) {
        return projectRepository.findAll().stream()
                .filter(project -> project.getCreatedBy().equals(createdBy))
                .toList();
    }

    public long countProjects() {
        return projectRepository.count();
    }
    public Project updateStatus(Long id, ProjectStatus status) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        p.setStatus(status);
        return projectRepository.save(p);
    }
}