package tech.ada.minhaquina.api.resultado;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SecurityRequirement(name = "Admin")
@SecurityRequirement(name = "User")
@Tag(name = "Resultados")
@RestController
@RequestMapping("/minha-quina/api/v1/apostas/{apostaId}/resultados")
public class ResultadoRestController {

    private final ResultadoService resultadoService;

    public ResultadoRestController(ResultadoService resultadoService) {
        this.resultadoService = resultadoService;
    }

    @Operation(description = "Mostra o resultado da aposta, se disponível")
    @GetMapping
    public ResultadoResponse getResultado(@PathVariable Long apostaId) {
        return resultadoService.getResultadoByAposta(apostaId);
    }
}
