package tech.ada.minhaquina.api.resultado;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import tech.ada.minhaquina.api.aposta.ApostaModel;
import tech.ada.minhaquina.api.aposta.ApostaRepository;
import tech.ada.minhaquina.api.sorteio.SorteioModel;
import tech.ada.minhaquina.api.sorteio.SorteioRepository;
import tech.ada.minhaquina.api.sorteio.SorteioService;
import tech.ada.minhaquina.client.Premio;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
public class ResultadoService {

    private final ResultadoRepository resultadoRepository;
    private final ApostaRepository apostaRepository;
    private final SorteioRepository sorteioRepository;
    private final SorteioService sorteioService;

    public ResultadoService(ResultadoRepository resultadoRepository, ApostaRepository apostaRepository, SorteioRepository sorteioRepository, SorteioService sorteioService) {
        this.resultadoRepository = resultadoRepository;
        this.apostaRepository = apostaRepository;
        this.sorteioRepository = sorteioRepository;
        this.sorteioService = sorteioService;
    }

    @Transactional
    public void deleteResultadoByApostaId(Long apostaId) {
        resultadoRepository.deleteByApostaId(apostaId);
    }

    public ResultadoResponse getResultadoByAposta(Long apostaId) {
        ApostaModel apostaModel = apostaRepository.findById(apostaId)
                .orElseThrow(() -> new NoSuchElementException("Id da aposta não existe"));
        sorteioService.getSorteioByAposta(apostaModel.getId());
        ResultadoModel resultadoModel = criarResultado(apostaModel);

        Optional<ResultadoModel> resultadoBancoDados = resultadoRepository
                .findByApostaAndSorteioAndPontuacaoAndValorPremio(
                        resultadoModel.getAposta(), resultadoModel.getSorteio(),
                        resultadoModel.getPontuacao(), resultadoModel.getValorPremio());

        return resultadoBancoDados.map(ResultadoResponse::new)
                .orElseGet(() -> new ResultadoResponse(saveResultado(resultadoModel)));
    }


    private ResultadoModel criarResultado(ApostaModel apostaModel) {
        SorteioModel sorteioModel = sorteioRepository.findByNumeroSorteio(apostaModel.getNumeroSorteio()).orElseThrow();
        int[] dezenasApostadas = apostaModel.getDezenas();
        int[] dezenasSorteadas = sorteioModel.getDezenasSorteadas();
        Integer pontuacao = calcularPontuacao(dezenasApostadas, dezenasSorteadas);
        BigDecimal valorPremio = calcularValorPremio(pontuacao, Premio.convertStringToPremio(sorteioModel.getPremios()));
        ResultadoModel resultadoModel = new ResultadoModel();
        resultadoModel.setSorteio(sorteioModel);
        resultadoModel.setAposta(apostaModel);
        resultadoModel.setPontuacao(pontuacao);
        resultadoModel.setValorPremio(valorPremio);
        return resultadoModel;
    }

    private ResultadoModel saveResultado(ResultadoModel resultadoModel) {
        return resultadoRepository.save(resultadoModel);
    }


    private BigDecimal calcularValorPremio(Integer pontuacao, List<Premio> premios) {
        return premios.stream()
                .filter(premio -> pontuacao.equals(Integer.parseInt(premio.getDescricao().substring(0, 1))))
                .map(Premio::getValorPremio)
                .findFirst()
                .orElse(BigDecimal.ZERO);
    }

    private Integer calcularPontuacao(int[] dezenasApostadas, int[] dezenasSorteadas) {
        return 10 - (int) Stream.of(Arrays.stream(dezenasApostadas), Arrays.stream(dezenasSorteadas))
                .flatMap(IntStream::boxed)
                .distinct()
                .count();
    }
}
