package tech.ada.minhaquina.api.resultado;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResultadoResponse {
    private Integer numeroSorteio;
    private LocalDate dataSorteio;
    private int[] dezenasSorteadas;
    private int[] dezenasApostadas;
    private boolean acumulado;
    private Integer pontuacao;
    private BigDecimal valorPremio;

    public ResultadoResponse(ResultadoModel resultadoModel) {
        this.numeroSorteio = resultadoModel.getSorteio().getNumeroSorteio();
        this.dataSorteio = resultadoModel.getSorteio().getDataSorteio();
        this.dezenasSorteadas = resultadoModel.getSorteio().getDezenasSorteadas();
        this.dezenasApostadas = resultadoModel.getAposta().getDezenas();
        this.acumulado = resultadoModel.getSorteio().isAcumulado();
        this.pontuacao = resultadoModel.getPontuacao();
        this.valorPremio = resultadoModel.getValorPremio();

    }
}
