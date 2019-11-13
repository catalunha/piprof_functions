import DatabaseReferences from "../database-references";
let admin = require('firebase-admin');

export function UsuarioNovoOnCreate(docSnapShot: any) {
  const docData = docSnapShot.data();
  const docId = docSnapShot.id;

  console.log("UsuarioNovoOnCreate :: " + docId);

  return DatabaseReferences.Usuario.where("email", "==", docData.email).get().then((usuario: any) => {
    if (usuario.docs.length > 0) {

      console.log("UsuarioNovoOnCreate. Usuario ja existe. Atualizando Usuario.turma")
      DatabaseReferences.Usuario.doc(usuario.docs[0].id).set({
        turma: admin.firestore.FieldValue.arrayUnion(docData.turma),
      }, { merge: true })
      //TODO: Precisa de promise. Pois ele pode apagar antes de incluir ?
      // DatabaseReferences.onDeleteDocument('UsuarioNovo', 'email', docData.email)

    } else {
      console.log("UsuarioNovoOnCreate. Criando novo usuario");
      DatabaseReferences.criarUsuario(docData);
      //TODO: Precisa de promise. Pois ele pode apagar antes de incluir ?
      // DatabaseReferences.onDeleteDocument('UsuarioNovo', 'email', docData.email)

    }
  }).catch((error: any) => {
    console.log("UsuarioNovoOnCreate. Error. " + error);
  })
}
