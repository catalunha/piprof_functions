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


# node
https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version
~~~
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
~~~

# bib ts

https://medium.com/@oieduardorabelo/typescript-o-guia-definitivo-1a63b04259cc

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

## usuarioOnUpdate

- Usuario.nome (professor=true)
  - Turma
  - Pasta
  - Problema
  - Simulacao
  - Avaliacao
  - Questao
  - Tarefa
  - Encontro

- Usuario.nome (professor=false)
  - Tarefa

- Usuario.foto (professor=false)
  - Tarefa

## usuarioOnDelete
Se professor
- Turma

Se aluno
- Tarefa
- Encontro
- Avaliacao.aplicadaPAluno
- Avaliacao.aplicadaPAlunoFunction

# Turma

## turmaOnUpdate

- Turma.nome
  - Avaliacao
  - Questao
  - Tarefa
  - Encontro

## turmaOnDelete

- Avaliacao
- Questao
- Tarefa
- Encontro

# Avaliacao

## avaliacaoOnUpdate
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

## avaliacaoOnDelete

- Questao
- Tarefa

# Questao

## questaoOnUpdate

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

## questaoOnDelete

- Tarefa
- Avaliacao.questaoAplicada
- Avaliacao.questaoAplicadaFunction

# Pasta

## pastaOnUpdate

- Pasta.nome
  - Problema

## pastaOnDelete
- Problema
- Simulacao


# Problema

## problemaOnUpdate

- Problema.nome
  - Simulacao

## problemaOnDelete

- Simulacao
