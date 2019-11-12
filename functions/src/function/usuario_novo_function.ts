// import admin = require("firebase-admin");
import DatabaseReferences from "../database-references";

export function iniciaOnCreate(snap: any) {
  let data = snap.data();

  return DatabaseReferences.usuariosRef.where("email", "==", data.email).get().then((usuario: any) => {
    if (usuario.docs.length > 0) {

      console.log("iniciaOnCreate >> Atualizar turmaList")

      let usuarioFiltradoData = usuario.docs[0].data()

      // let listaTurmas = new Array(data.turma)

      // usuarioFiltradoData.turma.push(data.turma)
      // let listaTurma = usuarioFiltradoData.turma.push(data.turma)

      console.log("usuarioFiltradoData.turma >> " + usuarioFiltradoData.turma)
      // console.log("data.turma >> " + data.turma)
      // console.log("listaTurma >> " + listaTurma)


      DatabaseReferences.usuariosRef.doc(usuario.docs[0].id).set({
        turma: usuarioFiltradoData.turma.concat([data.turma]),
      },{ merge: true })

    } else {
      console.log("iniciaOnCreate >> Criar novo usuario")
      DatabaseReferences.criarUsuario(data)
    }
  }).catch((error: any) => {
    console.log("Error: iniciaOnCreate >> " + error)
  })
}
