package com.example.circle_connectBackend.models;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;



@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password") // don't print password in logs
public class User {

    @Id

    private String id;


    private String username;


    private String email;

   

    private String password;



    private Role role = Role.USER;


    private String phone;


    private String profileImg;



    private LocalDateTime createdAt;
}

