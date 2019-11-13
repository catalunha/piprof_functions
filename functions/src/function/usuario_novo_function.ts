import DatabaseReferences from "../database-references";

export function UsuarioNovoOnCreate(usuarioNovoSnapShot: any) {
  let usuarioNovoData = usuarioNovoSnapShot.data();

  return DatabaseReferences.Usuario.where("email", "==", usuarioNovoData.email).get().then((usuario: any) => {
    if (usuario.docs.length > 0) {

      console.log("iniciaOnCreate >> Atualizar turmaList")
      let usuarioFiltradoData = usuario.docs[0].data()
      console.log("usuarioFiltradoData.turma >> " + usuarioFiltradoData.turma)
      DatabaseReferences.Usuario.doc(usuario.docs[0].id).set({
        turma: usuarioFiltradoData.turma.concat([usuarioNovoData.turma]),
      }, { merge: true })
      //TODO: Precisa de promise. Pois ele pode apagar antes de incluir ?
      DatabaseReferences.onDeleteDocument('UsuarioNovo', 'email', usuarioNovoData.email)

    } else {
      console.log("iniciaOnCreate >> Criar novo usuario")
      DatabaseReferences.criarUsuario(usuarioNovoData)
      //TODO: Precisa de promise. Pois ele pode apagar antes de incluir ?
      DatabaseReferences.onDeleteDocument('UsuarioNovo', 'email', usuarioNovoData.email)

    }
  }).catch((error: any) => {
    console.log("Error: iniciaOnCreate >> " + error)
  })
}


// import admin = require("firebase-admin");

      // let listaTurmas = new Array(data.turma)

      // usuarioFiltradoData.turma.push(data.turma)
      // let listaTurma = usuarioFiltradoData.turma.push(data.turma)

      // console.log("data.turma >> " + data.turma)
      // console.log("listaTurma >> " + listaTurma)

