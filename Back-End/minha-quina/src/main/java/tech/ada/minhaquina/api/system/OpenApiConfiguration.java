package tech.ada.minhaquina.api.system;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SecurityScheme(
        name = "Admin",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
@SecurityScheme(
        name = "User",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("API - Minha Quina")
                .description("API para cadastro de apostas, verificação de dados de sorteio e resultado da aposta")
                .version("1.0")
                .contact(apiContact());
    }

    private Contact apiContact() {
        return new Contact()
                .name("Adriano, Felipe, Hugo, Luiz Felipe")
                .url("https://github.com/FelipeBZanardo/Projeto-Final-Web-II");
    }


}
