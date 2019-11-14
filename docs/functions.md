# Duvidas
Quando usar return ?
Quando usar ;  ?
O que vem quando vc chama onUpdate ?
O que vem quando vc chama onDelete ?
O que vem quando vc chama onCreate ?
Diferença entre  console.log('',error) e   console.log(''+error)  ?
Como usar for ?
diferença entre then((usuario: any) => {   e    then(function (newUser) { 


# Cabeçadas

## Datas
Na comparação de datas apenas a ultima alternativa funciona.
~~~
  // if (docBeforeData.inicio != docAfterData.inicio) { // nao funciona
  // if (docBeforeData.inicio !== docAfterData.inicio) { // nao funciona
  // if ((docBeforeData.inicio as admin.firestore.Timestamp) != (docAfterData.inicio as admin.firestore.Timestamp)) { // nao funciona
  // if (docBeforeData.inicio.getTime() != docAfterData.inicio.getTime()) { // nao funciona

  if ((docBeforeData.inicio as Timestamp).toDate().toLocaleString() != (docAfterData.inicio as Timestamp).toDate().toLocaleString()) {
~~~


# bib ts

https://expertcodeblog.wordpress.com/2018/03/12/typescript-how-to-compare-two-dates/


## Comparação comm ===


# firebase
~~~
catalunha@nbuft:~/projetosfirebase/piprof_functions$ npm install -g firebase-tools
~~~
de va a pasta de functions e 
~~~
catalunha@nbuft:~/projetosfirebase/piprof_functions/functions$ npm install
~~~
Como está puxando o projeto do git tem que instalar as dependências

# Usuario

## UsuarioOnUpdate

- Usuario.nome (professor=true)
  - Turma
  - Pasta
  - Situacao
  - Simulacao
  - Avaliacao
  - Questao
  - Tarefa
  - Encontro

- Usuario.nome (professor=false)
  - Tarefa

- Usuario.foto (professor=false)
  - Tarefa

## UsuarioOnDelete
Se professor
- Turma

Se aluno
- Tarefa
- Encontro
- Avaliacao.aplicadaPAluno
- Avaliacao.aplicadaPAlunoFunction

# Turma

## TurmaOnUpdate

- Turma.nome
  - Avaliacao
  - Questao
  - Tarefa
  - Encontro

## TurmaOnDelete

- Avaliacao
- Questao
- Tarefa
- Encontro

# Avaliacao

## AvaliacaoOnUpdate
- Avaliacao.nome
  - Questao
  - Tarefa

- Avaliacao.inicio
  - Questao.inicio
  - Tarefa.inicio

- Avaliacao.fim
  - Questao.fim
  - Tarefa.fim

- Avaliacao.nota
  - Tarefa.avaliacaoNota

## AvaliacaoOnDelete

- Questao
- Tarefa

# Questao

## QuestaoOnUpdate

- Questao.inicio
  - Tarefa.inicio

- Questao.fim
  - Tarefa.fim
- Questao.tentativa
  - Tarefa.tentativa

- Questao.tempo
  - Tarefa.tempo

- Questao.erroRelativo
  - Tarefa.erroRelativo

- Questao.nota
  - Tarefa.questaoNota

## QuestaoOnDelete

- Tarefa
- Avaliacao.questaoAplicada
- Avaliacao.questaoAplicadaFunction

# Pasta

## PastaOnUpdate

- Pasta.nome
  - Situacao

## PastaOnDelete
- Situacao
- Simulacao


# Situacao

## SituacaoOnUpdate

- Situacao.nome
  - Simulacao

## SituacaoOnDelete

- Simulacao
