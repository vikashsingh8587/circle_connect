package com.example.circle_connectBackend.config;

import java.io.IOException;

import com.example.circle_connectBackend.service.UserDetailsServiceImpl;
import com.example.circle_connectBackend.util.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component
@Data
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private  JWT jwtUtility;
    @Autowired
    private  UserDetailsServiceImpl userdetailservices;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        log.info("hy in jwt filter");


        String authorizationHeader = request.getHeader("Authorization");

        log.info("authorizationHeader  : {}  " + authorizationHeader);

        String userId = null;
        String jwt = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);

            userId = jwtUtility.extractUserId(jwt);

        }
        if (userId != null) {
            UserDetails userDetails = userdetailservices.loadUserByUsername(userId);

            if (jwtUtility.validateToken(jwt)) {
                System.out.println("vaided");
                /*
                * UsernamePasswordAuthenticationToken me teen cheeze hoti h

Principal → Usually user ka detail object (yaha userDetails)

Credentials → Password (yaha null kyunki token validate ho chuka hai, password ki zarurat nahi)

Authorities → User ke roles/permissions (yaha userDetails.getAuthorities())

Ye user authenticated hai, aur iske ye roles/permissions hain."
                * */
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                System.out.println("username password are valid ");
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println("auth :0 " + auth);
                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("store in security" + SecurityContextHolder.getContext().getAuthentication().getName());
            }
        }
        chain.doFilter(request, response);
        System.out.println("done");
    }
}