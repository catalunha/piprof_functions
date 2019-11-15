import DatabaseReferences from "../database-references";


// ON UPDATE

export function uploadOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("uploadOnUpdate :: " + docId);

  if (docBeforeData.upload == false && docAfterData.upload == true && docAfterData.updateCollection.collection=='Usuario') {
    console.log("upload.upload alterado. Atualizando em: Aluno.")
    DatabaseReferences.updateDocumentWhereEquals('Usuario', 'foto.uploadID', docId, { 'foto.url': docAfterData.url })
  } 
  return 0
}

// export function uploadOnDelete(docSnapShot: any) {
//   const docId = docSnapShot.id;
//   console.log("uploadOnDelete :: " + docId);
//   console.log("uploadOnDelete. Apagando Avaliacao | Encontro.");
//   DatabaseReferences.deleteDocumentGeneric('Avaliacao', 'turma.id', docId);
//   DatabaseReferences.deleteDocumentGeneric('Encontro', 'turma.id', docId);
//   return 0;
// }

