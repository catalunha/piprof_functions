import DatabaseReferences from "../database-references";


// ON UPDATE

export function TurmaOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("TurmaOnUpdate :: " + docId);

  if (docBeforeData.nome != docAfterData.nome) {
    console.log("Turma.Nome alterado. Atualizando em: Avaliacao | Questao | Tarefa | Encontro.")
    DatabaseReferences.updateDocumentGeneric('Avaliacao', 'turma.id', docId, { 'turma.nome': docAfterData.nome })
    DatabaseReferences.updateDocumentGeneric('Questao', 'turma.id', docId, { 'turma.nome': docAfterData.nome })
    DatabaseReferences.updateDocumentGeneric('Tarefa', 'turma.id', docId, { 'turma.nome': docAfterData.nome })
    DatabaseReferences.updateDocumentGeneric('Encontro', 'turma.id', docId, { 'turma.nome': docAfterData.nome })
  } 
  return 0
}

export function TurmaOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("TurmaOnDelete :: " + docId);
  console.log("TurmaOnDelete. Apagando Avaliacao | Encontro.");
  DatabaseReferences.deleteDocumentGeneric('Avaliacao', 'turma.id', docId);
  DatabaseReferences.deleteDocumentGeneric('Encontro', 'turma.id', docId);
  return 0;
}

