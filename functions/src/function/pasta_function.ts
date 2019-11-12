import DatabaseReferences from "../database-references";


// ON UPDATE

export function PastaOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);
  //Update Nome noutras coll
  if (docSnapShotBeforeData.nome != docSnapShotAfterData.nome) {
    console.log("Pasta.Nome alterado. Atualizado nas demais collections")
    //Situacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Situacao', 'pasta.id', docSnapShotId, { 'pasta.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Pasta.Nome NAO alterado.")
  }

  return 0


}
