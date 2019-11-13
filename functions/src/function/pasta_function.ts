import DatabaseReferences from "../database-references";

export function PastaOnUpdate(docSnapShot: any) {
  const docBeforeData = docSnapShot.before.data();
  const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("PastaOnUpdate :: " + docId);

  if (docBeforeData.nome != docAfterData.nome) {
    console.log("Pasta.Nome alterado. Atualizando em: Situacao.")
    DatabaseReferences.updateDocumentGeneric('Situacao', 'pasta.id', docId, { 'pasta.nome': docAfterData.nome })
  }
  return 0
}

export function PastaOnDelete(docSnapShot: any) {
  const docId = docSnapShot.id;
  console.log("PastaOnDelete :: " + docId);
  console.log("UsuarioOnDelete. Apagando Situacao.");
  DatabaseReferences.deleteDocumentGeneric('Situacao', 'pasta.id', docId);

  return 0;
}

