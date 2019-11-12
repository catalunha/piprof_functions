import DatabaseReferences from "../database-references";


// ON UPDATE

export function AvaliacaoOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);
  //Update Nome noutras coll
  if (docSnapShotBeforeData.nome != docSnapShotAfterData.nome) {
    console.log("Avaliacao.Nome alterado. Atualizado nas demais collections")
    //Questao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'avaliacao.id', docSnapShotId, { 'avaliacao.nome': docSnapShotAfterData.nome })
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'avaliacao.id', docSnapShotId, { 'avaliacao.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Avaliacao.Nome NAO alterado.")
  }


    //Update Inicio noutras coll
    if (docSnapShotBeforeData.inicio != docSnapShotAfterData.inicio) {
      console.log("Avaliacao.Inicio alterado. Atualizado nas demais collections")
      //Questao
      DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'avaliacao.id', docSnapShotId, { 'inicio': docSnapShotAfterData.inicio })
      //Tarefa
      DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'avaliacao.id', docSnapShotId, { 'inicio': docSnapShotAfterData.inicio })
    } else {
      console.log("Avaliacao.Inicio NAO alterado.")
    }
  
    //Update fim noutras coll
    if (docSnapShotBeforeData.fim != docSnapShotAfterData.fim) {
      console.log("Avaliacao.fim alterado. Atualizado nas demais collections")
      //Questao
      DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'avaliacao.id', docSnapShotId, { 'fim': docSnapShotAfterData.fim })
      //Tarefa
      DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'avaliacao.id', docSnapShotId, { 'fim': docSnapShotAfterData.fim })
    } else {
      console.log("Avaliacao.fim NAO alterado.")
    }
  
      
    //Update nota noutras coll
    if (docSnapShotBeforeData.nota != docSnapShotAfterData.nota) {
      console.log("Avaliacao.nota alterado. Atualizado nas demais collections")
      //Tarefa
      DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'avaliacao.id', docSnapShotId, { 'avaliacaoNota': docSnapShotAfterData.nota })
    } else {
      console.log("Avaliacao.nota NAO alterado.")
    }
  

  return 0
}

export function AvaliacaoOnDelete(docSnapShot: any) {
  const docSnapShotId = docSnapShot.id;
  // Questao
  DatabaseReferences.onDeleteDocument('Questao', 'avaliacao.id', docSnapShotId)
  // Tarefa
  // DatabaseReferences.onDeleteDocument('Tarefa', 'avaliacao.id', docSnapShotId)
  return 0;
}

