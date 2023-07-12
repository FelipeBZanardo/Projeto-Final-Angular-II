package tech.ada.minhaquina.api.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;

public class GameConstraintValidator implements ConstraintValidator<GameConstraint, int[]> {

    @Override
    public boolean isValid(int[] ints, ConstraintValidatorContext constraintValidatorContext) {
        return ints.length == 5 && Arrays.stream(ints).distinct().count() == 5 &&
                dezenasValidas(ints);
    }

    private boolean dezenasValidas(int[] ints) {
        return Arrays.stream(ints)
                .allMatch(dezena -> dezena > 0 && dezena <= 80);
    }
}