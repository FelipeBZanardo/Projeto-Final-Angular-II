# Backlog do Projeto

## Implementações

- Consulta de Resultados ✅
  <br>

- Crud de apostas (implementar o ApostaService) → Felipe  ✅
- Dados do sorteio da aposta ✅
    - Problemas ao gerar dados do sorteio de uma aposta futura - Resolvido ✅ 
< br >
  
- Crud usuário (implementar o UserService -- intermediária) → verificar impl autenticação → Adriano
  - Feito apenas create, pois não usará "id", apenas token ⚠️
- Persistencia Resultado → Adriano
<br>

- Fazer o relacionamento das classes com JPA → ajustar a inclusao de resultados (ajustar entrega de 2af também)
- Acrescentar no application.properties as configurações do H2. ✅
  <br>

- Front-end: Luiz
  <br>

## Regras de negócio

- Não permite selecionar númeroSorteio maior que o número do próximo sorteio✅
- Data do jogo não pode ser maior que a data do sorteio✅
- Só é permitido jogos com 5 dezenas não repetidas✅
- Permitido números entre 1 e 80 ✅

Aposta-premiada

- numero_sorteio
- qtd pontos
- valor
- acumulou

### Apenas para teste
INSERT INTO
  usuarios
  (id, email, password, username)
VALUES
  (1, 'felipe@gmail.com', 'saddasd', 'felipe');




