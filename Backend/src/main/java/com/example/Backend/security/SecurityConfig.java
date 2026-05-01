package com.example.Backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;
import org.springframework.web.cors.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                // 🔥 ENABLE CORS
                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth

                        // 🔓 PUBLIC ROUTES
                        .requestMatchers("/api/auth/**").permitAll()

                        // 🔐 ADMIN ONLY
                        .requestMatchers("/api/projects/**").hasAuthority("ADMIN")

                        // 🔐 ADMIN + MEMBER
                        .requestMatchers("/api/tasks/**").hasAnyAuthority("ADMIN", "MEMBER")

                        // 🔐 AUTHENTICATED USERS
                        .requestMatchers("/api/dashboard/**").authenticated()

                        .anyRequest().authenticated()
                )

                // 🔥 JWT FILTER
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔥 MAIN CORS FIX (THIS WAS MISSING)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of("*")); // 🔥 allow all (dev + deployed)
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}