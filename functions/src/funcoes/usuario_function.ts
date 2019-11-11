import DatabaseReferences from "../database-references";


// ON UPDATE

export function iniciarUpdateCollectionUsuario(uploadSnap: any) {
  const uploadSnapBeforeData = uploadSnap.before.data();
  const uploadSnapAfterData = uploadSnap.after.data();
  const uploadSnapId = uploadSnap.after.id;

  console.log("uploadSnapBeforeData.nome >> " + uploadSnapBeforeData.nome);
  console.log("uploadSnapAfterData.nome >> " + uploadSnapAfterData.nome);

  if (uploadSnapBeforeData.nome != uploadSnapAfterData.nome) {
    console.log("ALTERANDO NOME DE USUARIO NAS DEMAIS COLLECTIONS")
    //UsuarioPerfil
    DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Turma', 'professor.id', uploadSnapId, { 'professor.nome': uploadSnapAfterData.nome })
    //QuestionarioAplicado
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'aplicador.id', uploadSnapId, { 'aplicador.nome': uploadSnapAfterData.nome })
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('QuestionarioAplicado', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
    // //Questionario
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Questionario', 'criou.id', uploadSnapId, { 'criou.nome': uploadSnapAfterData.nome })
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Questionario', 'editou.id', uploadSnapId, { 'editou.nome': uploadSnapAfterData.nome })
    // //Produto
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Produto', 'usuarioID.id', uploadSnapId, { 'usuarioID.nome': uploadSnapAfterData.nome })
    // //Noticias
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Noticia', 'usuarioIDDestino.'+uploadSnapId+'.id', true, { ['usuarioIDDestino.'+uploadSnapId+'.nome']: uploadSnapAfterData.nome })
    // DatabaseReferences.atualizarNomeDeCollectionEmOutrasCollections('Noticia', 'usuarioIDEditor.id', uploadSnapId, { 'usuarioIDEditor.nome': uploadSnapAfterData.nome })
    return 0
  } else {
    console.log("NAO FOI ENCONTRADO ALTERANCAO DE NOME DE USUARIO")
    return 0
  }
}
