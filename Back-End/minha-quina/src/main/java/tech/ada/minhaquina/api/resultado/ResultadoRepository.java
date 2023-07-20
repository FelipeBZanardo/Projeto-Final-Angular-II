package tech.ada.minhaquina.api.resultado;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.ada.minhaquina.api.aposta.ApostaModel;
import tech.ada.minhaquina.api.sorteio.SorteioModel;

import java.math.BigDecimal;
import java.util.Optional;

public interface ResultadoRepository extends JpaRepository<ResultadoModel, Long> {


    Optional<ResultadoModel> findByApostaAndSorteioAndPontuacaoAndValorPremio(ApostaModel apostaModel,
                                                                              SorteioModel sorteioModel,
                                                                              Integer pontuacao,
                                                                              BigDecimal valorPremio);

    void deleteByApostaId(Long apostaId);
}
