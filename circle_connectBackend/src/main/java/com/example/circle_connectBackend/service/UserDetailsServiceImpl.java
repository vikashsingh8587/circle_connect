package com.example.circle_connectBackend.service;

import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.repository.userRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final userRepository repo;

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        User user;

        if (input.contains("@")) {
            user = repo.findByEmail(input)
                    .orElseThrow(() -> new UsernameNotFoundException("username not found: " + input));
        } else {
            user = repo.findByUsername(input)
                    .orElseThrow(() -> new UsernameNotFoundException("username not found: " + input));
        }

        return new org.springframework.security.core.userdetails.User(
                String.valueOf(user.getId()),
                user.getPassword(),
                Collections.singleton(() -> "ROLE_" + user.getRole())
        );
    }
}
