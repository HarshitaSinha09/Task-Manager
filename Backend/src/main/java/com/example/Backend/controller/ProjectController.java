package com.example.Backend.controller;

import com.example.Backend.dto.ProjectRequest;
import com.example.Backend.model.Project;
import com.example.Backend.model.ProjectStatus;
import com.example.Backend.model.User;
import com.example.Backend.service.AuthService;
import com.example.Backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;

    @PostMapping
    public Project createProject(@RequestBody ProjectRequest req, Authentication auth) {


        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can create projects");
        }
        Project project = new Project();
        project.setName(req.getName());
        project.setDescription(req.getDescription());
        project.setStatus(ProjectStatus.TODO);
        project.setCreatedBy(user.getId());  // Set createdBy to current user

        return projectService.createProject(project);
    }

    @GetMapping
    public List<Project> getAllProjects(Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can view all projects");
        }

        return projectService.getAllProjects();
    }


    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id, Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can view projects");
        }

        return projectService.getProjectById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id, Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can delete projects");
        }

        projectService.deleteProject(id);
        return "Project deleted successfully";
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody ProjectRequest req, Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can update projects");
        }

        return projectService.updateProject(id, req);
    }

    @PutMapping("/{id}/status")
    public Project updateStatus(
            @PathVariable Long id,
            @RequestParam ProjectStatus status,
            Authentication auth
    ) {
        String email = auth.getName();
        User user = authService.getUserByEmail(email);
//
//        if (!"ADMIN".equals(user.getRole())) {
//            throw new RuntimeException("Only ADMIN can update status");
//        }

        return projectService.updateStatus(id, status);
    }
}