package com.example.circle_connectBackend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;
@Slf4j
@Component
public class JWT {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private Long expiration_time;


    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return createToken(claims, userId);
    }

    private String createToken(Map<String, Object> claims, String userId) {
        SecretKey s = getSigningKey();
        log.info("secret key : {}", s);
        Date now = new Date(System.currentTimeMillis());
        Date exp = new Date(System.currentTimeMillis() + expiration_time);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .signWith(s)
                .setIssuedAt(now)
                .setExpiration(exp)
                .compact();
    }

    public Boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public String extractUserId(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Claims extractAllClaims(String token) {
        try {
            System.out.println("Parser create ho raha hai...");
            JwtParserBuilder parserBuilder = Jwts.parserBuilder();

            System.out.println("Signing key set ho raha hai...");
            parserBuilder.setSigningKey(getSigningKey());

            System.out.println("Parser build ho gaya...");
            JwtParser parser = parserBuilder.build();

            System.out.println("Claims parse ho rahe hain...");
            Claims claims = parser.parseClaimsJws(token).getBody();

            System.out.println("Claims verify ho gaye: " + claims);

            return claims;
        } catch (Exception e) {
            System.out.println("claim are not verify ");
            throw new RuntimeException("hello " + e);
        }
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }
}
