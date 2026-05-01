package com.example.Backend.controller;

import com.example.Backend.dto.*;
import com.example.Backend.model.User;
import com.example.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody User user) {
        return new AuthResponse(authService.register(user));
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return new AuthResponse(authService.login(request.getEmail(), request.getPassword()));
    }
}