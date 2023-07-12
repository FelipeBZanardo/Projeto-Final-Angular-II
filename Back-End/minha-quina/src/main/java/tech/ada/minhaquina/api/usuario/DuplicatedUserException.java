package tech.ada.minhaquina.api.usuario;

public class DuplicatedUserException extends RuntimeException {

    public DuplicatedUserException(String message) {
        super(message);
    }
}
