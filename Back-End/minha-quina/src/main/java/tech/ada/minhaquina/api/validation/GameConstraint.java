package tech.ada.minhaquina.api.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Constraint(validatedBy = GameConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface GameConstraint {
    String message() default "O jogo tem que conter 5 dezenas de 1 a 80 que sejam diferentes";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
