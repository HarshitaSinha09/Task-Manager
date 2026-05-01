package com.example.Backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}