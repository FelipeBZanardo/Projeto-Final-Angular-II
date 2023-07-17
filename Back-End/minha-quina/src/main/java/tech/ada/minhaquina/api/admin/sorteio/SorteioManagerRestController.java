package tech.ada.minhaquina.api.admin.sorteio;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tech.ada.minhaquina.api.sorteio.SorteioService;
import tech.ada.minhaquina.client.SorteioDTO;

@SecurityRequirement(name = "Admin")
@Tag(name = "Sorteios - Consulta API Externa")
@PreAuthorize("hasRole('ADMIN')")
@Log4j2
@RestController
@RequestMapping("/minha-quina/api/v1/sorteios/external-search")
public class SorteioManagerRestController {

    private final SorteioService sorteioService;

    public SorteioManagerRestController(SorteioService sorteioService) {
        this.sorteioService = sorteioService;
    }

    @Operation(description = "Dados do último sorteio disponível")
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public SorteioDTO getUltimoResultado() {
        return sorteioService.getUltimoSorteio();
    }

    @Operation(description = "Dados do sorteio de acordo com o número do sorteio")
    @GetMapping("/{numero}")
    public SorteioDTO getResultadoByNumeroSorteio(@PathVariable Integer numero) {
        return sorteioService.getSorteioByNumeroSorteio(numero);
    }


}
