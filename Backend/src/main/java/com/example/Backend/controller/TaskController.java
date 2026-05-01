package com.example.Backend.controller;

import com.example.Backend.dto.TaskRequest;
import com.example.Backend.model.*;
import com.example.Backend.service.TaskService;
import com.example.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final AuthService authService;

    @PostMapping
    public Task createTask(@RequestBody TaskRequest req, Authentication auth) {
        User user = authService.getUserByEmail(auth.getName());

        Task task = new Task();
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setProjectId(req.getProjectId());
        task.setDueDate(req.getDueDate());
        task.setStatus(TaskStatus.TODO);

        // Set assignedTo based on user role
        if ("ADMIN".equals(user.getRole())) {
            // ADMIN can assign task to anyone (including themselves)
            task.setAssignedTo(req.getAssignedTo());

        } else if ("MEMBER".equals(user.getRole())) {
            // MEMBER can only assign tasks to themselves
            task.setAssignedTo(user.getId());

        } else {
            throw new RuntimeException("Unknown user role: " + user.getRole());
        }

        return taskService.createTask(task);
    }


    @GetMapping
    public List<Task> getAllTasks(Authentication auth) {
        String email = auth.getName();
        User user = authService.getUserByEmail(email);

        if ("ADMIN".equals(user.getRole())) {
            return taskService.getAllTasks();
        } else if ("MEMBER".equals(user.getRole())) {
            return taskService.getTasksByUser(user.getId());
        } else {
            throw new RuntimeException("Unknown user role: " + user.getRole());
        }
    }

    @GetMapping("/user/{userId}")
    public List<Task> getByUser(@PathVariable Long userId, Authentication auth) {

        String email = auth.getName();
        User currentUser = authService.getUserByEmail(email);

        if ("MEMBER".equals(currentUser.getRole()) && !currentUser.getId().equals(userId)) {
            throw new RuntimeException("MEMBER can only view their own tasks");
        }

        return taskService.getTasksByUser(userId);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestParam TaskStatus status, Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);
        Task task = taskService.getTaskById(id);


        if ("MEMBER".equals(user.getRole()) && !task.getAssignedTo().equals(user.getId())) {
            throw new RuntimeException("MEMBER can only update tasks assigned to them");
        }
        return taskService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id, Authentication auth) {

        String email = auth.getName();
        User user = authService.getUserByEmail(email);

        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Only ADMIN can delete tasks");
        }

        taskService.deleteTask(id);
        return "Task deleted successfully";
    }
}