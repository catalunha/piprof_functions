import DatabaseReferences from "../database-references";
import { Timestamp } from "@google-cloud/firestore";

export function AvaliacaoOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;
  console.log("AvaliacaoOnUpdate. id: " + docId);
  if (docBeforeData.nome != docAfterData.nome) {
    console.log("Avaliacao.Nome alterado. " + docBeforeData.nome + "!=" + docAfterData.nome + " .Atualizando em: Questao | Tarefa.");
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'avaliacao.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'avaliacao.nome': docAfterData.nome });
  }
  if ((docBeforeData.inicio as Timestamp).toDate().toLocaleString() != (docAfterData.inicio as Timestamp).toDate().toLocaleString()) {
    console.log("Avaliacao.Inicio alterado?. " + (docBeforeData.inicio as Timestamp).toDate() + "!=" + (docAfterData.inicio as Timestamp).toDate() + " .Atualizando em: Questao | Tarefa.")
    console.log("Avaliacao.Inicio alterado?. " + (docBeforeData.inicio as Timestamp).toDate().toLocaleString() + "!=" + (docAfterData.inicio as Timestamp).toDate().toLocaleString() + " .Atualizando em: Questao | Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'inicio': docAfterData.inicio });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'inicio': docAfterData.inicio });
  }
  if ((docBeforeData.fim as Timestamp).toDate().toLocaleString() != (docAfterData.fim as Timestamp).toDate().toLocaleString()) {
    console.log("Avaliacao.fim alterado. " + (docBeforeData.fim as Timestamp).toDate().toLocaleString() + "!=" + (docAfterData.fim as Timestamp).toDate().toLocaleString() + " .Atualizando em: Questao | Tarefa.")
    DatabaseReferences.updateDocumentWhereEquals('Questao', 'avaliacao.id', docId, { 'fim': docAfterData.fim });
    DatabaseReferences.updateDocumentWhereEquals('Tarefa', 'avaliacao.id', docId, { 'fim': docAfterData.fim });
  }
  if (docBeforeData.nota != docAfterData.nota) {
    console.log("Avaliacao.nota alterado. " + docBeforeData.nota + "!=" + docAfterData.nota + " .Atualizando em: Tarefa.");
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

