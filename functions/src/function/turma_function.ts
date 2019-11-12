import DatabaseReferences from "../database-references";


// ON UPDATE

export function TurmaOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);
  //Update Nome noutras coll
  if (docSnapShotBeforeData.nome != docSnapShotAfterData.nome) {
    console.log("Turma.Nome alterado. Atualizado nas demais collections")
    //Avaliacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Avaliacao', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Questao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Encontro
    DatabaseReferences.updateDocumentNoCampoXComValorX('Encontro', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Turma.Nome NAO alterado.")
  }

  return 0


}



export function TurmaOnDelete(docSnapShot: any) {
  const docSnapShotId = docSnapShot.id;
  // Avaliacao
  DatabaseReferences.onDeleteDocument('Avaliacao', 'turma.id', docSnapShotId)
  // Questao
  // DatabaseReferences.onDeleteDocument('Questao', 'turma.id', docSnapShotId)
  // Tarefa
  // DatabaseReferences.onDeleteDocument('Tarefa', 'turma.id', docSnapShotId)
  // Encontro
  DatabaseReferences.onDeleteDocument('Encontro', 'turma.id', docSnapShotId)
  return 0;
}

