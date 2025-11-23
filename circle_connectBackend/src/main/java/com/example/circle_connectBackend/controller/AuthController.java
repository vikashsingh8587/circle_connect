package com.example.circle_connectBackend.controller;

import com.example.circle_connectBackend.dto.LoginRequests;
import com.example.circle_connectBackend.dto.RegisterRequest;
import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createUser( @RequestBody  RegisterRequest rq){
        return ResponseEntity.ok(userService.CreateUser(rq));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequests loginRequests){

        return  ResponseEntity.ok(userService.loginUser(loginRequests));

    }
}
