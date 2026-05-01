package com.example.Backend.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService service;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String header = req.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        try {
            String token = header.substring(7);
            if (token.isEmpty()) {
                chain.doFilter(req, res);
                return;
            }

            String email = jwtUtil.extractEmail(token);
            if (email == null) {
                chain.doFilter(req, res);
                return;
            }
            if (!jwtUtil.isTokenValid(token)) {
                chain.doFilter(req, res);
                return;
            }

            var user = service.loadUserByUsername(email);

            var auth = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities()
            );

            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            //  VERY IMPORTANT: do NOT crash app
            System.out.println("JWT Error: " + e.getMessage());
            SecurityContextHolder.clearContext();
        }

        chain.doFilter(req, res);
    }
}