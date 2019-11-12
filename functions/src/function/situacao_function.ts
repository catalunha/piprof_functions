import DatabaseReferences from "../database-references";


// ON UPDATE

export function SituacaoOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);
  //Update Nome noutras coll
  if (docSnapShotBeforeData.nome != docSnapShotAfterData.nome) {
    console.log("Situacao.Nome alterado. Atualizado nas demais collections")
    //Simulacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Simulacao', 'situacao.id', docSnapShotId, { 'situacao.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Situacao.Nome NAO alterado.")
  }
  return 0
}

export function SituacaoOnDelete(docSnapShot: any) {
  const docSnapShotId = docSnapShot.id;
  // Tarefa
  DatabaseReferences.onDeleteDocument('Simulacao', 'situacao.id', docSnapShotId)
  return 0;
}

