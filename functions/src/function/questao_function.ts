import DatabaseReferences from "../database-references";


// ON UPDATE

export function QuestaoOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("QuestaoOnUpdate :: " + docId);

  if (docBeforeData.inicio != docAfterData.inicio) {
    console.log("Questao.Inicio alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentGeneric('Tarefa', 'questao.id', docId, { 'inicio': docAfterData.inicio })
  }
  if (docBeforeData.fim != docAfterData.fim) {
    console.log("Questao.fim alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentGeneric('Tarefa', 'questao.id', docId, { 'fim': docAfterData.fim })
  }
  if (docBeforeData.nota != docAfterData.nota) {
    console.log("Questao.nota alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentGeneric('Tarefa', 'questao.id', docId, { 'questaoNota': docAfterData.nota })
  }

  return 0
}

export function QuestaoOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("QuestaoOnDelete :: " + docId);
  console.log("QuestaoOnDelete. Apagando Tarefa.");
  DatabaseReferences.deleteDocumentGeneric('Tarefa', 'questao.id', docId);
  return 0;
}

