import DatabaseReferences from "../database-references";


// ON UPDATE

export function QuestaoOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);

  //Update Inicio noutras coll
  if (docSnapShotBeforeData.inicio != docSnapShotAfterData.inicio) {
    console.log("Questao.Inicio alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'questao.id', docSnapShotId, { 'inicio': docSnapShotAfterData.inicio })
  } else {
    console.log("Questao.Inicio NAO alterado.")
  }

  //Update fim noutras coll
  if (docSnapShotBeforeData.fim != docSnapShotAfterData.fim) {
    console.log("Questao.fim alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'questao.id', docSnapShotId, { 'fim': docSnapShotAfterData.fim })
  } else {
    console.log("Questao.fim NAO alterado.")
  }


  //Update nota noutras coll
  if (docSnapShotBeforeData.nota != docSnapShotAfterData.nota) {
    console.log("Questao.nota alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'questao.id', docSnapShotId, { 'questaoNota': docSnapShotAfterData.nota })
  } else {
    console.log("Questao.nota NAO alterado.")
  }


  return 0
}

export function QuestaoOnDelete(docSnapShot: any) {
  const docSnapShotId = docSnapShot.id;
  // Tarefa
  DatabaseReferences.onDeleteDocument('Tarefa', 'questao.id', docSnapShotId)
  return 0;
}

