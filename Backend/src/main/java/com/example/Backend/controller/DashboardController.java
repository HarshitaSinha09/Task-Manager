package com.example.Backend.controller;

import com.example.Backend.model.Task;
import com.example.Backend.model.TaskStatus;
import com.example.Backend.model.User;
import com.example.Backend.repository.TaskRepository;
import com.example.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final TaskRepository taskRepository;
    private final AuthService authService;


    @GetMapping
    public Map<String, Object> dashboard(Authentication auth) {

        Map<String, Object> response = new HashMap<>();
        String email = auth.getName();
        User user = authService.getUserByEmail(email);

        if ("ADMIN".equals(user.getRole())) {
            response.put("total", taskRepository.count());
            response.put("completed", taskRepository.countByStatus(TaskStatus.DONE));
            response.put("pending", taskRepository.countByStatus(TaskStatus.TODO));
            response.put("userRole", "ADMIN");
            response.put("message", "Showing all tasks in system");

        } else if ("MEMBER".equals(user.getRole())) {

            List<Task> userTasks = taskRepository.findByAssignedTo(user.getId());

            long totalTasks = userTasks.size();
            long completedTasks = userTasks.stream()
                    .filter(task -> task.getStatus() == TaskStatus.DONE)
                    .count();
            long pendingTasks = userTasks.stream()
                    .filter(task -> task.getStatus() == TaskStatus.TODO)
                    .count();

            response.put("total", totalTasks);
            response.put("completed", completedTasks);
            response.put("pending", pendingTasks);
            response.put("userRole", "MEMBER");
            response.put("message", "Showing only your assigned tasks");

        } else {
            throw new RuntimeException("Unknown user role: " + user.getRole());
        }

        response.put("userName", user.getName());
        response.put("userEmail", user.getEmail());

        return response;
    }

    @GetMapping("/user")
    public Map<String, Object> getUserInfo(Authentication auth) {
        String email = auth.getName();
        User user = authService.getUserByEmail(email);

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("canManageProjects", "ADMIN".equals(user.getRole()));
        response.put("canCreateTasks", true);

        return response;
    }
}