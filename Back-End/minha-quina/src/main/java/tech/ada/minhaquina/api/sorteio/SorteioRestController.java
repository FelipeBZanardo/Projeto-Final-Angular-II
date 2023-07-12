package tech.ada.minhaquina.api.sorteio;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.ada.minhaquina.client.SorteioDTO;

@SecurityRequirement(name = "Admin")
@SecurityRequirement(name = "User")
@Tag(name = "Sorteios")
@RestController
@RequestMapping("/minha-quina/api/v1/apostas/{apostaId}/sorteios")
public class SorteioRestController {

    private final SorteioService sorteioService;

    public SorteioRestController(SorteioService sorteioService) {
        this.sorteioService = sorteioService;
    }

    @Operation(description = "Dados do sorteio relacionado à aposta, se disponível")
    @GetMapping()
    public SorteioDTO getSorteioCadastradoByNumeroSorteio(@PathVariable Long apostaId) {
        return sorteioService.getSorteioByAposta(apostaId);
    }


}
