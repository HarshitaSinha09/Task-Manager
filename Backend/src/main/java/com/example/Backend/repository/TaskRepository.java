package com.example.Backend.repository;

import com.example.Backend.model.Task;
import com.example.Backend.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedTo(Long userId);

    long countByStatus(TaskStatus status);
}