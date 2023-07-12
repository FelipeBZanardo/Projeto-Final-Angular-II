package tech.ada.minhaquina.api.aposta;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Apostas")
@SecurityRequirement(name = "Admin")
@SecurityRequirement(name = "User")
@RestController
@RequestMapping("/minha-quina/api/v1/apostas")
public class ApostaRestController {

    private final ApostaService apostaService;

    public ApostaRestController(ApostaService apostaService) {
        this.apostaService = apostaService;
    }

    @Operation(description = "Lista todas as apostas do usuário logado")
    @GetMapping
    public List<ApostaDTO> getAllApostas(@AuthenticationPrincipal UserDetails userDetails) {
        return apostaService.getAllApostas(userDetails);
    }

    @Operation(description = "Busca aposta de acordo com seu Id")
    @GetMapping("/{apostaId}")
    public ApostaDTO getApostaById(@PathVariable Long apostaId, @AuthenticationPrincipal UserDetails userDetails) {
        return apostaService.getApostaById(userDetails, apostaId);
    }

    @Operation(description = "Cria uma nova aposta")
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApostaDTO saveAposta(@Valid @RequestBody ApostaDTO apostaDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return apostaService.saveAposta(userDetails, apostaDTO);
    }

    @Operation(description = "Atualiza uma determinada aposta")
    @PutMapping("/{apostaId}")
    public ApostaDTO updateAposta(@PathVariable Long apostaId, @RequestBody ApostaDTO apostaDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return apostaService.updateAposta(userDetails, apostaId, apostaDTO);
    }

    @Operation(description = "Deleta uma determinada aposta")
    @DeleteMapping("/{apostaId}")
    public void deleteAposta(@PathVariable Long apostaId, @AuthenticationPrincipal UserDetails userDetails) {
        apostaService.deleteAposta(userDetails, apostaId);
    }

}
