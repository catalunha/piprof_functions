import DatabaseReferences from "../database-references";

// ON UPDATE
export function AvaliacaoOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;
  console.log("AvaliacaoOnUpdate. id: " + docId);
  if (docBeforeData.nome != docAfterData.nome) {
    console.log("Avaliacao.Nome alterado. Atualizando em: Questao | Tarefa.");
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'avaliacao.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'avaliacao.nome': docAfterData.nome });
  }
  if (docBeforeData.inicio != docAfterData.inicio) {
    console.log("Avaliacao.Inicio alterado. Atualizando em: Questao | Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'inicio': docAfterData.inicio });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'inicio': docAfterData.inicio });
  }
  if (docBeforeData.fim != docAfterData.fim) {
    console.log("Avaliacao.fim alterado. Atualizando em: Questao | Tarefa.");
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'fim': docAfterData.fim });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'fim': docAfterData.fim });
  }
  if (docBeforeData.nota != docAfterData.nota) {
    console.log("Avaliacao.nota alterado. Atualizando em: Questao | Tarefa.");
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'avaliacaoNota': docAfterData.nota });
  }
  return 0
}

export function AvaliacaoOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("AvaliacaoOnDelete. id: " + docId);
  console.log("AvaliacaoOnDelete. Apagando Questao.");
  DatabaseReferences.deleteDocumentGeneric('Questao', 'avaliacao.id', docId);
  return 0;
}

