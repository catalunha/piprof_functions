import DatabaseReferences from "../database-references";


// ON UPDATE

export function UsuarioOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("docBeforeData.nome >> " + docBeforeData.nome);
  console.log("docAfterData.nome >> " + docAfterData.nome);
  //Update Nome de professor noutras coll
  if (docBeforeData.professor == true && (docBeforeData.nome != docAfterData.nome)) {
    console.log("Professor Usuario.Nome alterado. Atualizado nas demais collections")
    //Turma
    DatabaseReferences.updateDocumentNoCampoXComValorX('Turma', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Pasta
    DatabaseReferences.updateDocumentNoCampoXComValorX('Pasta', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Situacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Situacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Simulacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Simulacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Avaliacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Avaliacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Questao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
    //Encontro
    DatabaseReferences.updateDocumentNoCampoXComValorX('Encontro', 'professor.id', docId, { 'professor.nome': docAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

  //Update Nome de aluno noutras coll
  if (docBeforeData.professor == false && (docBeforeData.nome != docAfterData.nome)) {
    console.log("Aluno Usuario.Nome alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', docId, { 'aluno.nome': docAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

//Update Foto de aluno noutras coll
if (docBeforeData.professor == false && (docBeforeData.foto.url != docAfterData.foto.url)) {
  console.log("Aluno Usuario.foto.url alterado. Atualizado nas demais collections")
  //Tarefa
  DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', docId, { 'aluno.foto': docAfterData.foto.url })
} else {
  console.log("Usuario.Nome NAO alterado.")
}


  return 0


}
