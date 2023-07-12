package tech.ada.minhaquina.api.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsuarioRequest {
    @Pattern(regexp = "[\\w\\p{L}.]{5,20}")
    private String username;
    @Email
    private String email;
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$")
    private String password;
    @Pattern(regexp = "^[a-zA-Z]{4,5}$")
    private String role;
}
