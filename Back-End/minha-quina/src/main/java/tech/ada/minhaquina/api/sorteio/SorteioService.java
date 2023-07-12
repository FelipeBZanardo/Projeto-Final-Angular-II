package tech.ada.minhaquina.api.sorteio;

import feign.FeignException;
import org.springframework.stereotype.Service;
import tech.ada.minhaquina.api.aposta.ApostaModel;
import tech.ada.minhaquina.api.aposta.ApostaRepository;
import tech.ada.minhaquina.api.exception.SorteioException;
import tech.ada.minhaquina.client.QuinaRestClient;
import tech.ada.minhaquina.client.SorteioDTO;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
public class SorteioService {

    private final QuinaRestClient quinaRestClient;
    private final SorteioRepository sorteioRepository;
    private final ApostaRepository apostaRepository;

    public SorteioService(QuinaRestClient quinaRestClient, SorteioRepository sorteioRepository, ApostaRepository apostaRepository) {
        this.quinaRestClient = quinaRestClient;
        this.sorteioRepository = sorteioRepository;
        this.apostaRepository = apostaRepository;
    }

    public SorteioDTO getUltimoSorteio() {
        return quinaRestClient.getUltimoSorteio();
    }

    public SorteioDTO getSorteioByNumeroSorteio(Integer numero) {
        return quinaRestClient.getSorteioByNumeroSorteio(numero);
    }

    public void saveSorteio(Integer numeroSorteio) {
        try {
            SorteioDTO sorteioDTO = getSorteioByNumeroSorteio(numeroSorteio);
            sorteioRepository.save(SorteioDTO.convertToModel(new SorteioModel(), sorteioDTO));
        } catch (FeignException e) {
            SorteioDTO ultimoSorteio = getUltimoSorteio();
            LocalDate dataProximoSorteio = ultimoSorteio.getDataProximoSorteio();
            throw new SorteioException(numeroSorteio, dataProximoSorteio);
        }
    }


    public SorteioDTO getSorteioByAposta(Long apostaId) {
        ApostaModel apostaModel = apostaRepository.findById(apostaId)
                .orElseThrow(() -> new NoSuchElementException("Id de aposta não existe"));
        Integer numeroSorteio = apostaModel.getNumeroSorteio();
        if (!sorteioRepository.existsByNumeroSorteio(numeroSorteio))
            saveSorteio(numeroSorteio);

        SorteioModel sorteioModel = sorteioRepository.findByNumeroSorteio(numeroSorteio).orElseThrow();
        return SorteioDTO.from(sorteioModel);
    }
}
