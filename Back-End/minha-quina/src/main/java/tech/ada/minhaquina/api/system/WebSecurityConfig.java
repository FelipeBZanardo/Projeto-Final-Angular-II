package tech.ada.minhaquina.api.system;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Profile("security-custom-user")
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {

    private static final String[] AUTH_ALLOWLIST = {
            // -- Swagger UI v3
            "/v3/api-docs/**",
            "v3/api-docs/**",
            "/swagger-ui/**",
            "swagger-ui/**",
            "/swagger-ui.html",
            "swagger-ui.html",
            "/v3/api-docs.yaml",
            // Actuators
            "/actuator/**",
            "/health/**",
            // Login
            "/auth/**",
            // Actions
            "/minha-quina/**",
    };
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers(PathRequest.toH2Console()).permitAll()
                                .requestMatchers(AUTH_ALLOWLIST).permitAll()
                                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                                .requestMatchers("/minha-quina/api/v1/apostas/**").authenticated()
                                .anyRequest().authenticated()
                )
                .headers().frameOptions().disable()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .cors().disable();
        return http.build();
    }
}
