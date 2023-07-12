# Projeto Final Web II - Minha Quina

> *Turma 938 - Santander Coders - Trilha Web FullStack*

API (Application Programming Interface) desenvolvida com o intuito de registrar apostas de Loteria, ver detalhes do
sorteio e conferir o resultado (quantidade de acertos e prêmio);

## 📋Enunciado do Projeto

- Grupos de 3 a 4 pessoas
- Construir uma API
- Persistência em banco de dados (H2 ou Postgres)
- Configuração de segurança: controle de rota e login (jwt opcional)
- Consumo de uma API externa pública
- Frontend opcional

## ✒️Autores - Grupo 3

- [Adriano Dias](https://github.com/asdiasx)
- [Felipe Zanardo](https://github.com/FelipeBZanardo)
- [Hugo](https://github.com/hgrafa)
- [Luiz Felipe](https://github.com/lufedev)

## 🌎 API externa consumida

`https://servicebus2.caixa.gov.br/portaldeloterias/api/quina/`

## 📖 Regras de Negócio

- Acesso público para login de usuários;
- Não permite criação de usuários com username ou e-mail já cadastrados;
- Para criação de apostas:
    - Não permite selecionar "númeroSorteio" maior que o número do próximo sorteio
    - Data da aposta não pode ser posterior a data do sorteio;
    - Só é permitido jogos com 5 dezenas não repetidas
    - Números permitidos entre 1 e 80

## 📌 Endpoints da API

### 🔐 Autenticação (Acesso público)

- **Login usuário/admin**

```
[POST] http://localhost:8080/auth/login

{
    "username":"JoaoSilva",
    "password":"MY46pass$"
}
```

```
Retorno:
{
	"token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2FvU2lsdmEiLCJpYXQiOjE2ODAwOTAxNjIsImV4cCI6MTY4MDA5Mzc2Mn0.GX5MXrDn-ob1PeQ8sTUgwYvSV_L6ZtRw4t5NOUohUjU"
}
```

- **Logout usuário/admin**

```
[POST] http://localhost:8080/auth/logout
```

### 👤 CRUD de Usuários/Admin (Somente Admin)

- **Cadastro**

```
[POST] localhost:8080/minha-quina/api/v1/usuarios/cadastro

{
    "username": "JoaoSilva",
    "email": "jofgod2@email.com",
    "password": "MY46pass$",
	"role": "user"
}
```

- **Atualização**

```
[PUT] localhost:8080/minha-quina/api/v1/usuarios/{idUser}/editar

{
    "username": "JoaoSilva",
    "email": "jofgod2@email.com",
    "password": "MY46pass$",
	"role": "user"
}
```

- **Exclusão**

```
[DELETE] localhost:8080/minha-quina/api/v1/usuarios/{idUser}/deletar
```

### 🗺️ Dados da API externa (Somente Admin)

- **Sorteio mais recente**

```
[GET] http://localhost:8080/minha-quina/api/v1/sorteios/external-search
```

- **Sorteio de acordo com o número do sorteio**

```
[GET] http://localhost:8080/minha-quina/api/v1/sorteios/external-search/6100
```

### 🎰 CRUD de Apostas (de cada Usuário)

Obs: Id do Usuário obtido diretamente pelo Token

- **Cadastro**

```
[POST] http://localhost:8080/minha-quina/api/v1/apostas

{
	"numeroSorteio": 6112,
	"dezenas": [2,58,25,62,3],
	"dataJogo": "2023-03-29"
}
```

- **Lista de todas as apostas**

```
[GET] http://localhost:8080/minha-quina/api/v1/apostas
```

- **Busca por uma aposta**

```
[GET] http://localhost:8080/minha-quina/api/v1/apostas{idAposta}
```

- **Atualização**

```
[PUT] http://localhost:8080/minha-quina/api/v1/apostas/{idAposta}

{
	"numeroSorteio": 6112,
	"dezenas": [2,58,25,62,3],
	"dataJogo": "2023-03-29"
}
```

- **Exclusão**

```
[DELETE] http://localhost:8080/minha-quina/api/v1/apostas/{idAposta}
```

### 🧾 Detalhes do Sorteio (de cada Aposta)

Obs: Id do Usuário obtido diretamente pelo Token

```
[GET] http://localhost:8080/minha-quina/api/v1/apostas/{idAposta}/sorteios
```

### 🪙 Detalhes do Resultado (de cada Aposta)

Obs: Id do Usuário obtido diretamente pelo Token

```
[GET] http://localhost:8080/minha-quina/api/v1/apostas/{idAposta}/resultados
```

## 🛠️ Tecnologias Utilizadas

* [IntelliJ IDEA](https://www.jetbrains.com/pt-br/idea/) - IDE
* [Spring Initializer](https://start.spring.io/)
* [Maven](https://maven.apache.org/) - Gerenciador de Dependência
* [H2 Database](https://www.h2database.com/html/main.html) - Banco de Dados em memória

## 📈 Melhorias futuras
- Rever regras de segurança para permitir usuário criar/editar cadastro (o Administrador apenas ativar o cadastro)
- Aceitar apostas com mais de 5 dezenas na cartela. O jogo oficial das Loterias Caixa aceita até 15 dezenas;
- Aceitar outros tipos de apostas como Mega-sena , Lotofácil, etc;
- Usar a API para gerar bolões entre um grupo de pessoas.
