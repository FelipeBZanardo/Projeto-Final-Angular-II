package tech.ada.minhaquina.api.exception;

public class NumeroSorteioException extends RuntimeException {

    private final Integer numeroProximoSorteio;

    public NumeroSorteioException(Integer numeroProximoSorteio) {
        this.numeroProximoSorteio = numeroProximoSorteio;
    }

    @Override
    public String getMessage() {
        return "Número do sorteio inválido. O número do próximo sorteio é " +
                this.numeroProximoSorteio;
    }
}
