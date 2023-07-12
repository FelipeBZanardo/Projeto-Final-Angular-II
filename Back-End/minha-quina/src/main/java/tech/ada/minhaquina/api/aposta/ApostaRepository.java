package tech.ada.minhaquina.api.aposta;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApostaRepository extends JpaRepository<ApostaModel, Long> {

    List<ApostaModel> findAllByUsuarioUsername(String username);

    Optional<ApostaModel> findByUsuarioUsernameAndId(String username, Long id);
}
