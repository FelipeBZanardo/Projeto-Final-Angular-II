# Modelos de Dados
<br>

## Tabela APOSTA_MODEL
<br>

id: bigint (chave primária)  
data_jogo: date  
dezenas_sorteadas: integer array  
numero_sorteio: integer  
usuario_id: bigint (chave estrangeira)  
<br>

## Tabela RESULTADO_MODEL
<br>

id: bigint (chave primária)  
pontuacao: integer  
valor_premio: numeric  
aposta_id: gigint (chave estrangeira)  
sorteio_id: gigint (chave estrangeira)  
<br>

## Tabela SORTEIO_MODEL
<br>

id: bigint (chave primária)  
acumulado: boolean  
data_proximo_sorteio: date  
data_sorteio: date  
dezenas_sorteadas: integer array  
numero_concurso_proximo: integer  
numero_sorteio: integer  
premios: varchar  
valor_acumulado_proximo_concurso: numeric  
<br>

## Tabela USUARIOS
<br>

id: bigint (chave primária)  
email: varchar  
password: varchar  
username: varchar  

<br>
