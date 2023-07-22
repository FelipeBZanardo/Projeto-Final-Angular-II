package tech.ada.minhaquina.api.auth;

import tech.ada.minhaquina.api.usuario.Role;

public record AuthenticationResponse(String token, Role role) {
}

