package tech.ada.minhaquina.api.exception;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DataJogoException extends RuntimeException {

    private final Integer numeroSorteio;
    private final LocalDate dataSorteio;

    public DataJogoException(Integer numeroSorteio, LocalDate dataSorteio) {
        this.numeroSorteio = numeroSorteio;
        this.dataSorteio = dataSorteio;
    }

    @Override
    public String getMessage() {
        return "A data do jogo não deve ser posterior a data do sorteio. " +
                "O sorteio de número " + numeroSorteio + " foi/será realizado em " +
                dataSorteio.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}
