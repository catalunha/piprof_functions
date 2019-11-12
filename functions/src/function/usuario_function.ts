import DatabaseReferences from "../database-references";


// ON UPDATE

export function UsuarioOnUpdate(docSnapShot: any) {
  const docSnapShotBeforeData = docSnapShot.before.data();
  const docSnapShotAfterData = docSnapShot.after.data();
  const docSnapShotId = docSnapShot.after.id;

  console.log("docSnapShotBeforeData.nome >> " + docSnapShotBeforeData.nome);
  console.log("docSnapShotAfterData.nome >> " + docSnapShotAfterData.nome);
  //Update Nome de professor noutras coll
  if (docSnapShotBeforeData.professor == true && (docSnapShotBeforeData.nome != docSnapShotAfterData.nome)) {
    console.log("Professor Usuario.Nome alterado. Atualizado nas demais collections")
    //Turma
    DatabaseReferences.updateDocumentNoCampoXComValorX('Turma', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Pasta
    DatabaseReferences.updateDocumentNoCampoXComValorX('Pasta', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Situacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Situacao', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Simulacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Simulacao', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Avaliacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Avaliacao', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Questao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
    //Encontro
    DatabaseReferences.updateDocumentNoCampoXComValorX('Encontro', 'professor.id', docSnapShotId, { 'professor.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

  //Update Nome de aluno noutras coll
  if (docSnapShotBeforeData.professor == false && (docSnapShotBeforeData.nome != docSnapShotAfterData.nome)) {
    console.log("Aluno Usuario.Nome alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', docSnapShotId, { 'aluno.nome': docSnapShotAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

//Update Foto de aluno noutras coll
if (docSnapShotBeforeData.professor == false && (docSnapShotBeforeData.foto.url != docSnapShotAfterData.foto.url)) {
  console.log("Aluno Usuario.foto.url alterado. Atualizado nas demais collections")
  //Tarefa
  DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', docSnapShotId, { 'aluno.foto': docSnapShotAfterData.foto.url })
} else {
  console.log("Usuario.Nome NAO alterado.")
}


  return 0


}
