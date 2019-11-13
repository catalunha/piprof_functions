import DatabaseReferences from "../database-references";


// ON UPDATE

export function UsuarioOnUpdate(usuarioDocSnapShot: any) {
  const usuarioBeforeData = usuarioDocSnapShot.before.data();
  const usuarioAfterData = usuarioDocSnapShot.after.data();
  const usuarioId = usuarioDocSnapShot.after.id;

  console.log("usuarioBeforeData.nome >> " + usuarioBeforeData.nome);
  console.log("usuarioAfterData.nome >> " + usuarioAfterData.nome);
  //Update Nome de professor noutras coll
  if (usuarioBeforeData.professor == true && (usuarioBeforeData.nome != usuarioAfterData.nome)) {
    console.log("Professor Usuario.Nome alterado. Atualizado nas demais collections")
    //Turma
    DatabaseReferences.updateDocumentNoCampoXComValorX('Turma', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Pasta
    DatabaseReferences.updateDocumentNoCampoXComValorX('Pasta', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Situacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Situacao', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Simulacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Simulacao', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Avaliacao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Avaliacao', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Questao
    DatabaseReferences.updateDocumentNoCampoXComValorX('Questao', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
    //Encontro
    DatabaseReferences.updateDocumentNoCampoXComValorX('Encontro', 'professor.id', usuarioId, { 'professor.nome': usuarioAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

  //Update Nome de aluno noutras coll
  if (usuarioBeforeData.professor == false && (usuarioBeforeData.nome != usuarioAfterData.nome)) {
    console.log("Aluno Usuario.Nome alterado. Atualizado nas demais collections")
    //Tarefa
    DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', usuarioId, { 'aluno.nome': usuarioAfterData.nome })
  } else {
    console.log("Usuario.Nome NAO alterado.")
  }

//Update Foto de aluno noutras coll
if (usuarioBeforeData.professor == false && (usuarioBeforeData.foto.url != usuarioAfterData.foto.url)) {
  console.log("Aluno Usuario.foto.url alterado. Atualizado nas demais collections")
  //Tarefa
  DatabaseReferences.updateDocumentNoCampoXComValorX('Tarefa', 'aluno.id', usuarioId, { 'aluno.foto': usuarioAfterData.foto.url })
} else {
  console.log("Usuario.Nome NAO alterado.")
}


  return 0


}
