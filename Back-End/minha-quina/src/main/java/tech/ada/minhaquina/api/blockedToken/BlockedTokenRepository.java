package tech.ada.minhaquina.api.blockedToken;


import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedTokenRepository extends JpaRepository<BlockedTokenModel, Long> {
    boolean existsByBlockedToken(String token);
}
