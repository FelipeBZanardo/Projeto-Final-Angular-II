package tech.ada.minhaquina.api.aposta;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tech.ada.minhaquina.api.exception.DataJogoException;
import tech.ada.minhaquina.api.exception.NumeroSorteioException;
import tech.ada.minhaquina.api.usuario.UsuarioModel;
import tech.ada.minhaquina.api.usuario.UsuarioRepository;
import tech.ada.minhaquina.client.QuinaRestClient;
import tech.ada.minhaquina.client.SorteioDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ApostaService {

    private final ApostaRepository apostaRepository;
    private final QuinaRestClient quinaRestClient;
    private final UsuarioRepository usuarioRepository;

    public ApostaService(ApostaRepository apostaRepository, QuinaRestClient quinaRestClient, UsuarioRepository usuarioRepository) {
        this.apostaRepository = apostaRepository;
        this.quinaRestClient = quinaRestClient;
        this.usuarioRepository = usuarioRepository;
    }

    public List<ApostaDTO> getAllApostas(UserDetails userDetails) {
        return apostaRepository.findAllByUsuarioUsername(userDetails.getUsername())
                .stream()
                .map(ApostaDTO::from)
                .toList();
    }

    public ApostaDTO getApostaById(UserDetails userDetails, Long apostaId) {
        ApostaModel apostaModel = getApostaModelByUsuarioNameAndId(userDetails.getUsername(), apostaId);
        return ApostaDTO.from(apostaModel);
    }

    public ApostaDTO saveAposta(UserDetails userDetails, ApostaDTO apostaDTO) {
        UsuarioModel usuarioModel = getUsuarioByUsername(userDetails.getUsername());
        return salvarAposta(new ApostaModel(), apostaDTO, usuarioModel);
    }

    public ApostaDTO updateAposta(UserDetails userDetails, Long apostaId, ApostaDTO apostaDTO) {
        UsuarioModel usuarioModel = getUsuarioByUsername(userDetails.getUsername());
        ApostaModel apostaAModificar = getApostaModelByUsuarioNameAndId(userDetails.getUsername(), apostaId);
        return salvarAposta(apostaAModificar, apostaDTO, usuarioModel);
    }

    public void deleteAposta(UserDetails userDetails, Long apostaId) throws NoSuchElementException {
        ApostaModel aposta = getApostaModelByUsuarioNameAndId(userDetails.getUsername(), apostaId);
        apostaRepository.delete(aposta);
    }

    private ApostaDTO salvarAposta(ApostaModel apostaModel, ApostaDTO apostaDTO, UsuarioModel usuarioModel) {
        verificarNumeroSorteio(apostaDTO.getNumeroSorteio());
        verificarDataJogo(apostaDTO.getNumeroSorteio(), apostaDTO.getDataJogo());
        ApostaModel aposta = apostaRepository.save(ApostaDTO.convertToModel(apostaModel, apostaDTO, usuarioModel));
        return ApostaDTO.from(aposta);
    }

    private void verificarNumeroSorteio(Integer numeroSorteio) {
        SorteioDTO ultimoSorteio = quinaRestClient.getUltimoSorteio();
        if (numeroSorteio > ultimoSorteio.getNumeroConcursoProximo())
            throw new NumeroSorteioException(ultimoSorteio.getNumeroConcursoProximo());
    }

    private void verificarDataJogo(Integer numeroSorteio, LocalDate dataJogo) {
        SorteioDTO ultimoSorteio = quinaRestClient.getUltimoSorteio();
        if (ultimoSorteio.getNumeroConcursoProximo().equals(numeroSorteio)) {
            if (dataJogo.isAfter(ultimoSorteio.getDataProximoSorteio()))
                throw new DataJogoException(numeroSorteio, ultimoSorteio.getDataProximoSorteio());
            return;
        }

        SorteioDTO sorteio = quinaRestClient.getSorteioByNumeroSorteio(numeroSorteio);
        if (dataJogo.isAfter(sorteio.getDataSorteio()))
            throw new DataJogoException(numeroSorteio, sorteio.getDataSorteio());
    }

    private UsuarioModel getUsuarioByUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("Id de usuário não existe"));
    }

    private ApostaModel getApostaModelByUsuarioNameAndId(String username, Long apostaId) {
        return apostaRepository.findByUsuarioUsernameAndId(username, apostaId)
                .orElseThrow(() -> new NoSuchElementException("Id da aposta não existe"));
    }


}
