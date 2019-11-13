import DatabaseReferences from "../database-references";


// ON UPDATE

export function SituacaoOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("SituacaoOnUpdate :: " + docId);

  if (docBeforeData.nome != docAfterData.nome) {
    console.log("Situacao.Nome alterado. Atualizando em: Simulacao.")
    DatabaseReferences.updateDocumentGeneric('Simulacao', 'situacao.id', docId, { 'situacao.nome': docAfterData.nome })
  } 
  return 0
}

export function SituacaoOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("SituacaoOnDelete :: " + docId);
  console.log("SituacaoOnDelete. Apagando Simulacao.");
  DatabaseReferences.deleteDocumentGeneric('Simulacao', 'situacao.id', docId);
  return 0;
}

