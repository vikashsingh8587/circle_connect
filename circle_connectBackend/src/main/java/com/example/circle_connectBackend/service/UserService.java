package com.example.circle_connectBackend.service;

import com.example.circle_connectBackend.dto.RegisterRequest;
import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.repository.userRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {
    @Autowired
    private userRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private  SequenceGenerator sequenceGenerator;


    public boolean CreateUser(RegisterRequest rq) {

        String email = (rq.getEmail() != null) ? rq.getEmail().trim() : "";
        String password = (rq.getPassword() != null) ? rq.getPassword().trim() : "";
        String confirmPassword = (rq.getConfirmPassword() != null) ? rq.getConfirmPassword().trim() : "";
        System.out.println(email);


        if (email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            log.info("email :{}  password {}  confirsme {}",email,password,confirmPassword);
            log.info("hy 111111111111111111111111111111111111111111111111111111111111st");
            return false;
        }


        if (!password.equals(confirmPassword)) {
            log.info("hy 1111111111111111111111111111111111111111111111111111111111112st");
            return false;
        }

        boolean exist_email = userRepo.existsByEmail(email);
        if (exist_email) {
            log.info("hy 1111111111111111111111111111111111111111111113st");
            return false;
        }


        long seq = sequenceGenerator.generateSequence("USER");
        String userId = "USER" + String.valueOf(seq);


        User user = new User();
        user.setId(userId);
        user.setEmail(email);
        String pass= passwordEncoder.encode(password);
        user.setPassword(pass);

        userRepo.save(user);

        return true;
    }

}
