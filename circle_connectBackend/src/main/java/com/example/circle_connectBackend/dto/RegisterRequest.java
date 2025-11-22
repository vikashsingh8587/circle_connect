package com.example.circle_connectBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RegisterRequest {

    private  String email;
    private String password;
    private  String confirmPassword;
}
