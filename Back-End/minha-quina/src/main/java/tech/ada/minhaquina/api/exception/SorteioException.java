package tech.ada.minhaquina.api.exception;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class SorteioException extends RuntimeException {

    private final Integer numeroSorteio;
    private final LocalDate dataSorteio;

    public SorteioException(Integer numeroSorteio, LocalDate dataSorteio) {
        this.numeroSorteio = numeroSorteio;
        this.dataSorteio = dataSorteio;
    }

    @Override
    public String getMessage() {
        return "O sorteio de número " + numeroSorteio + " será realizado em " +
                dataSorteio.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + " após as 20h";
    }
}
