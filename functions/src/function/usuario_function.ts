import DatabaseReferences from "../database-references";
let admin = require('firebase-admin');


// ON UPDATE

export function UsuarioOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("UsuarioOnUpdate :: " + docId);

  if (docBeforeData.professor == true && (docBeforeData.nome != docAfterData.nome)) {
    console.log("Professor Usuario.Nome alterado.  Atualizando em: Turma | Pasta | Situacao | Simulacao | Avaliacao | Questao | Tarefa | Encontro.");
    DatabaseReferences.updateDocumentGeneric('Turma', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Pasta', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Situacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Simulacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Avaliacao', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Questao', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Tarefa', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
    DatabaseReferences.updateDocumentGeneric('Encontro', 'professor.id', docId, { 'professor.nome': docAfterData.nome });
  }
  if (docBeforeData.professor == false) {
    if (docBeforeData.nome != docAfterData.nome) {
      console.log("Aluno Usuario.Nome alterado.  Atualizando em: Tarefa.");
      DatabaseReferences.updateDocumentGeneric('Tarefa', 'aluno.id', docId, { 'aluno.nome': docAfterData.nome });
    }
    if (docBeforeData.foto.url != docAfterData.foto.url) {
      console.log("Aluno Usuario.foto.url alterado. Atualizando em: Tarefa");
      DatabaseReferences.updateDocumentGeneric('Tarefa', 'aluno.id', docId, { 'aluno.foto': docAfterData.foto.url });
    }
  }
  return 0
}


export function UsuarioOnDelete(docSnapShot: any) {
  const docData = docSnapShot.data();
  const docId = docSnapShot.id;
  console.log("UsuarioOnDelete :: " + docId);
  if (docData.professor == true) {
    console.log("UsuarioOnDelete. Apagando Turma.");
    DatabaseReferences.deleteDocumentGeneric('Turma', 'professor.id', docId);
  }
  if (docData.professor == false) {
    console.log("UsuarioOnDelete. Apagando Tarefa.");
    DatabaseReferences.deleteDocumentGeneric('Tarefa', 'aluno.id', docId);
    DatabaseReferences.updateDocumentWhereArrayContains('Encontro', 'aluno', docId, { 'aluno': admin.firestore.FieldValue.arrayRemove(docId)});
    DatabaseReferences.updateDocumentWhereArrayContains('Avaliacao', 'aplicadaPAluno', docId, { 'aplicadaPAluno': admin.firestore.FieldValue.arrayRemove(docId)});
    DatabaseReferences.updateDocumentWhereArrayContains('Avaliacao', 'aplicadaPAlunoFunction', docId, { 'aplicadaPAlunoFunction': admin.firestore.FieldValue.arrayRemove(docId)});

  }
  return 0;
}


