
## App Minha Quina
<br>
<br>

### Mapeamento de endpoints

<br>

#### Consulta de Resultados
- `http://localhost:8080/minha-quina/api/v1/resultados`

    `[GET]` - Recebe as informações detalhadas do sorteio mais recente.

- `http://localhost:8080/minha-quina/api/v1/resultados/<num sorteio>`

    `[GET]` - Recebe as informações detalhadas do sorteio especificado na URL.
<br/>

#### CRUD de Apostas
- `http://localhost:8080/minha-quina/api/v1/apostas/:id`

    `[GET]` - Recebe as informações detalhadas de uma aposta do usuário autenticado.

- `http://localhost:8080/minha-quina/api/v1/apostas`

    `[GET]` - Recebe lista de apostas do usuário autenticado.

- `http://localhost:8080/minha-quina/api/v1/apostas`

    `[POST]` - Cria uma aposta para usuário autenticado.

- `http://localhost:8080/minha-quina/api/v1/apostas/:id`

    `[PUT]` - Edita uma aposta do usuário autenticado especificada na URL.

- `http://localhost:8080/minha-quina/api/v1/apostas/:id`

    `[DELETE]` - Remove a aposta do usuário autenticado especificada na URL.

<br/>

#### Autenticação de Usuário.
- `http://localhost:8080/minha-quina/api/v1/users/login/:id`

    `[POST]` - Realiza o Login do usuário.

- `http://localhost:8080/minha-quina/api/v1/users/cadastro`

    `[POST]` - Cria uma conta de usuário.

- `http://localhost:8080/minha-quina/api/v1/users/:id/editar`

    `[PUT]` - Edita uma informação do usuário autenticado.

- `http://localhost:8080/minha-quina/api/v1/users/:id/deletar`

    `[DELETE]` - Deleta um usuário.
