package tech.ada.minhaquina.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Premio {
    @JsonProperty("descricaoFaixa")
    private String descricao;
    private Integer faixa;
    private Integer numeroDeGanhadores;
    private BigDecimal valorPremio;

    public static String convertPremioToString(List<Premio> premios) {
        return premios.stream()
                .map(premio -> premio.getDescricao() + "," +
                        premio.getFaixa() + "," +
                        premio.getNumeroDeGanhadores() + "," +
                        premio.getValorPremio())
                .reduce("", (string1, string2) -> string1.concat("\n").concat(string2))
                .substring(1);
    }

    public static List<Premio> convertStringToPremio(String premiosString) {
        String[] premios = premiosString.split("\n");
        return Arrays.stream(premios)
                .map(premio -> {
                    String[] atributoPremio = premio.split(",");
                    return new Premio(atributoPremio[0],
                            Integer.valueOf(atributoPremio[1]),
                            Integer.valueOf(atributoPremio[2]),
                            new BigDecimal(atributoPremio[3]));
                })
                .toList();
    }
}
