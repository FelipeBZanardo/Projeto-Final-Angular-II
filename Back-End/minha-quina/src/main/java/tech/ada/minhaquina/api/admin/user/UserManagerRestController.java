package tech.ada.minhaquina.api.admin.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.ada.minhaquina.api.usuario.UsuarioRepository;
import tech.ada.minhaquina.api.usuario.UsuarioResponse;

import java.util.List;

@SecurityRequirement(name = "Admin")
@RestController
@RequestMapping("/minha-quina/api/v1/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Usuários")
public class UserManagerRestController {

    private final UsuarioRepository userJpaRepository;

    @Operation(description = "Lista usuários cadastrados")
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<UsuarioResponse> listar() {
        return this.userJpaRepository.findAll().stream()
                .map(UsuarioResponse::new)
                .toList();
    }
}
