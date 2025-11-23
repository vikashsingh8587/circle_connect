package com.example.circle_connectBackend.service;

import com.example.circle_connectBackend.dto.LoginRequests;
import com.example.circle_connectBackend.dto.RegisterRequest;
import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.repository.userRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Service
@Slf4j
public class UserService {
    @Autowired
    private userRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SequenceGenerator sequenceGenerator;


    public boolean CreateUser(RegisterRequest rq) {

        String email = (rq.getEmail() != null) ? rq.getEmail().trim() : "";
        String password = (rq.getPassword() != null) ? rq.getPassword().trim() : "";
        String confirmPassword = (rq.getConfirmPassword() != null) ? rq.getConfirmPassword().trim() : "";
        System.out.println(email);

        if (email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            log.info("email :{}  password {}  confirsme {}", email, password, confirmPassword);
            return false;
        }
        if (!password.equals(confirmPassword)) {
            return false;
        }
        boolean exist_email = userRepo.existsByEmail(email);
        if (exist_email) {
            return false;
        }
        long seq = sequenceGenerator.generateSequence("USER");
        String userId = "USER" + String.valueOf(seq);

        User user = new User();
        user.setId(userId);
        user.setEmail(email);
        user.setCreatedAt(LocalDateTime.now());
        String pass = passwordEncoder.encode(password);
        user.setPassword(pass);

        userRepo.save(user);

        return true;
    }


    public User loginUser(LoginRequests l) {
        String userName = l.getEmail();
        String password = l.getPassword();
        User user = userRepo.findByEmail(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }


    public User updateUser(User updateUser,String userId){
        User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("user not found"));
        user.setEmail(updateUser.getEmail());
        user.setPhone(updateUser.getPhone());
        user.setUsername(updateUser.getUsername());

        userRepo.save(user);

        return user;


    }

    public User makeProfile(User user, MultipartFile imageFile) throws IOException {
        user.setProfileImg(imageFile.getOriginalFilename());
        user.setImageDate(imageFile.getBytes());
     return    userRepo.save(user);
    }
}


