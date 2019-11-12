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
    DatabaseReferences.updateQueryDocumentNoCampoXComValorX('Avaliacao', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Questao
    DatabaseReferences.updateQueryDocumentNoCampoXComValorX('Questao', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Tarefa
    DatabaseReferences.updateQueryDocumentNoCampoXComValorX('Tarefa', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
    //Encontro
    DatabaseReferences.updateQueryDocumentNoCampoXComValorX('Encontro', 'turma.id', docSnapShotId, { 'turma.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Turma.Nome NAO alterado.")
  }

  return 0


}
