package tech.ada.minhaquina.api.usuario;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsuarioResponse {
    private String username;
    private String email;

    public UsuarioResponse(UsuarioModel usuarioModel) {
        this.username = usuarioModel.getUsername();
        this.email = usuarioModel.getEmail();
    }
}
