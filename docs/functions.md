# Duvidas
Quando usar return ?
Quando usar ;  ?
O que vem quando vc chama onUpdate ?
O que vem quando vc chama onDelete ?
O que vem quando vc chama onCreate ?
Diferença entre  console.log('',error) e   console.log(''+error)  ?
Como usar for ?
diferença entre then((usuario: any) => {   e    then(function (newUser) { 

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
