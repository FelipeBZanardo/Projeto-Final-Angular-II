package tech.ada.minhaquina.api.aposta;

import jakarta.persistence.*;
import lombok.*;
import tech.ada.minhaquina.api.usuario.UsuarioModel;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class ApostaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numeroSorteio;
    private int[] dezenas;
    private LocalDate dataJogo;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModel usuario;
}