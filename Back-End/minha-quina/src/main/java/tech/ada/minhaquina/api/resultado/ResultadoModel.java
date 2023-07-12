package tech.ada.minhaquina.api.resultado;

import jakarta.persistence.*;
import lombok.*;
import tech.ada.minhaquina.api.aposta.ApostaModel;
import tech.ada.minhaquina.api.sorteio.SorteioModel;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class ResultadoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "aposta_id")
    private ApostaModel aposta;
    @OneToOne
    @JoinColumn(name = "sorteio_id")
    private SorteioModel sorteio;
    private Integer pontuacao;
    private BigDecimal valorPremio;
}
