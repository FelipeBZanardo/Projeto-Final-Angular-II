package tech.ada.minhaquina.api.usuario;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsuarioResponse {
    private Long id;
    private String username;
    private String email;
    private Role role;

    public UsuarioResponse(UsuarioModel usuarioModel) {
        this.id = usuarioModel.getId();
        this.username = usuarioModel.getUsername();
        this.email = usuarioModel.getEmail();
        this.role = usuarioModel.getRole();
    }
}
