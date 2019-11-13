import DatabaseReferences from "../database-references";
let admin = require('firebase-admin');


// ON UPDATE

export function QuestaoOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("QuestaoOnUpdate :: " + docId);

  if (docBeforeData.inicio != docAfterData.inicio) {
    console.log("Questao.Inicio alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'questao.id', docId, { 'inicio': docAfterData.inicio })
  }
  if (docBeforeData.fim != docAfterData.fim) {
    console.log("Questao.fim alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'questao.id', docId, { 'fim': docAfterData.fim })
  }
  if (docBeforeData.nota != docAfterData.nota) {
    console.log("Questao.nota alterado. Atualizando em: Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'questao.id', docId, { 'questaoNota': docAfterData.nota })
  }

  return 0
}

export function QuestaoOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("QuestaoOnDelete :: " + docId);
  console.log("QuestaoOnDelete. Apagando Tarefa Atualizando Avaliacao.");
  DatabaseReferences.deleteDocumentGeneric('Tarefa', 'questao.id', docId);
  DatabaseReferences.updateDocumentWhereArrayContains('Avaliacao', 'questaoAplicada', docId, { 'questaoAplicada': admin.firestore.FieldValue.arrayRemove(docId)});
  DatabaseReferences.updateDocumentWhereArrayContains('Avaliacao', 'questaoAplicadaFunction', docId, { 'questaoAplicadaFunction': admin.firestore.FieldValue.arrayRemove(docId)});
  return 0;
}

