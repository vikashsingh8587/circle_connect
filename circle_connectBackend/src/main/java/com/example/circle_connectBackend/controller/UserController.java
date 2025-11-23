package com.example.circle_connectBackend.controller;

import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService service;

    public  ResponseEntity<?>makeProfile(@RequestPart User user,@RequestPart MultipartFile imageFile){
        try{
            User user1=service.makeProfile(user,imageFile);
            return  new ResponseEntity<>(user1,HttpStatus.CREATED);
        }
        catch (Exception e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
