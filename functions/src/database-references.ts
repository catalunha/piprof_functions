import * as admin from 'firebase-admin';

admin.initializeApp();
const databaseReferences = admin.firestore();

export default class DatabaseReferences {
  //referencia geral
  public static db = databaseReferences;

  //referencias auxiliares
  public static UsuarioCol = databaseReferences.collection('Usuario');
  public static avaliacaoRef = databaseReferences.collection('Avaliacao');
  public static questaoRef = databaseReferences.collection('Questao');
  public static situacaoRef = databaseReferences.collection('Situacao');
  public static simulacaoRef = databaseReferences.collection('Simulacao');
  public static tarefaRef = databaseReferences.collection('Tarefa');

  public static TurmaCollection = databaseReferences.collection('Turma');

  // public static questionarioAplicadoRef = databaseReferences.collection('QuestionarioAplicado');
  // public static PerguntaAplicadaRef = databaseReferences.collection('PerguntaAplicada');

  // public static pefilRef = databaseReferences.collection('Perfil');
  // public static uploadRef = databaseReferences.collection('Upload');
  // public static usuarioPerfilRef = databaseReferences.collection('UsuarioPerfil');
  // public static documentoRef = databaseReferences.collection('Documento');

  // public static setorCensitarioPainelRef = databaseReferences.collection('SetorCensitarioPainel');
  // public static painelRef = databaseReferences.collection('Painel');
  // public static setorCensitarioRef = databaseReferences.collection('SetorCensitario');

  // public static questionarioRef = databaseReferences.collection('Questionario');
  // public static perguntaRef = databaseReferences.collection('Pergunta');
  // public static eixoRef = databaseReferences.collection('Eixo');

  // public static controleTarefaRef = databaseReferences.collection('ControleTarefa');
  // public static controleAcaoRef = databaseReferences.collection('ControleAcao');


  public static updateDocumentNoCampoXComValorX(collectionName: any, fieldName: any, value: any, updateJsonData: any) {
    this.db.collection(collectionName).where(fieldName, '==', value).get().then( (querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach( (docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).update(updateJsonData).then(() => {
            console.log("updateDocumentNoCampoXComValorX ::  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((err: any) => {
      console.log('Error getting documents em updateDocumentNoCampoXComValorX  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + fieldName, err)
    })
  }

  // public static atualizarDadosDeCollectionEmOutrasCollectionsMerge(collectionNome: any, whereRefId: any, novaRefId: any, updateJsonData: any) {
  //     this.db.collection(collectionNome).where(whereRefId, '==', novaRefId).get().then(async (dadosFiltrado: any) => {
  //         if (dadosFiltrado.docs.length > 0) {
  //             dadosFiltrado.docs.forEach(async (dadoFiltrado: any, index_filt: any, array_filt: any) => {
  //                 this.db.collection(collectionNome).doc(dadoFiltrado.id).set(updateJsonData, { merge: true }).then(() => {
  //                     //console.log("ATUALIZAR NOME COLECTION " + collectionNome + " >> " + dadoFiltrado.id);
  //                 })
  //             })
  //         }
  //     }).catch((err: any) => {
  // public static criarUsuario(data: any) {
  //     admin.auth().createUser({
  //         email: data.email,
  //         emailVerified: false,
  //         password: "pmsb22to",
  //         //displayName: data.nome,
  //     }).then(function (userRecord) {

  //         console.log("Successfully created new user:", userRecord.uid);

  //         // let email: any = userRecord.email;
  //         // admin.auth().generateEmailVerificationLink(email).then((result) => {
  //         //     console.log("Send verification email : " + result)
  //         // });

  //     }).catch(function (error) {
  //         console.log("Error creating new user:", error);
  //     });
  // }
  //         console.log('Error getting documents : atualizarNomeUsuarioEmCollection ', err)
  //     })

  // }

  public static onDeleteDocument(collectionName: any, fieldName: any, value: any) {
    this.db.collection(collectionName).where(fieldName, '==', value).get().then((querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach((docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).delete().then(() => {
            console.log("onDeleteDocument ::  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((err: any) => {
      console.log('Error getting documents em  onDeleteDocument  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + fieldName, err)
    })

  }

  public static criarUsuario(usuarioNovo: any) {
    admin.auth().createUser({
      email: usuarioNovo.email,
      emailVerified: false,
      password: "piprofbrintec",
    }).then(function (newUser) {

      console.log("Successfully created new user:", newUser.uid);

      DatabaseReferences.UsuarioCol.doc().set({
        ativo: usuarioNovo.ativo,
        email: usuarioNovo.email,
        matricula: usuarioNovo.matricula,
        nome: usuarioNovo.nome,
        rota: usuarioNovo.rota,
        turma: [usuarioNovo.turma],
        professor: false,
      })

    }).catch(function (error) {
      console.log("Error creating new user:", error);
    });
  }




}