package tech.ada.minhaquina.api.sorteio;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SorteioRepository extends JpaRepository<SorteioModel, Long> {
    Optional<SorteioModel> findByNumeroSorteio(Integer numero);

    boolean existsByNumeroSorteio(Integer numero);


}
