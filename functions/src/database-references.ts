import * as admin from 'firebase-admin';

admin.initializeApp();
const databaseReferences = admin.firestore();

export default class DatabaseReferences {
  //referencia geral
  public static db = databaseReferences;

  //referencias auxiliares
  public static Usuario = databaseReferences.collection('Usuario');
  public static Avaliacao = databaseReferences.collection('Avaliacao');
  public static Questao = databaseReferences.collection('Questao');
  public static Problema = databaseReferences.collection('Problema');
  public static Simulacao = databaseReferences.collection('Simulacao');
  public static Tarefa = databaseReferences.collection('Tarefa');
  public static Turma = databaseReferences.collection('Turma');
  public static Upload = databaseReferences.collection('Upload');


  public static updateDocumentWhereEquals(collectionName: any, fieldName: any, value: any, updateJsonData: any) {
    console.log("updateDocumentWhereEquals. Entrada Col.: " + collectionName + " field: " + fieldName + " value: " + value + " json" + updateJsonData);

    this.db.collection(collectionName).where(fieldName, '==', value).get().then( (querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach( (docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).update(updateJsonData).then(() => {
            console.log("updateDocumentWhereEquals. Atualizado  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((error: any) => {
      console.log('updateDocumentWhereEquals. Error getting documents.  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + value, error)
    })
  }


  public static updateDocumentWhereArrayContains(collectionName: any, fieldName: any, value: any, updateJsonData: any) {
    console.log("updateDocumentWhereArrayContains. Entrada Col.: " + collectionName + " field: " + fieldName + " value: " + value + " json" + updateJsonData);

    this.db.collection(collectionName).where(fieldName, 'array-contains', value).get().then( (querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach( (docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).update(updateJsonData).then(() => {
            console.log("updateDocumentWhereArrayContains. Atualizado  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((error: any) => {
      console.log('updateDocumentWhereArrayContains. Error getting documents.  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + value, error)
    })
  }


  public static deleteDocumentGeneric(collectionName: any, fieldName: any, value: any) {
    console.log("deleteDocumentGeneric. Entrada Col.: " + collectionName + " field: " + fieldName + " value: " + value);

    this.db.collection(collectionName).where(fieldName, '==', value).get().then((querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach((docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).delete().then(() => {
            console.log("deleteDocumentGeneric. Deletado  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((error: any) => {
      console.log('deleteDocumentGeneric. Error getting documents.  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + value, error);
    })
  }

  public static criarUsuario(usuarioNovo: any) {
    admin.auth().createUser({
      email: usuarioNovo.email,
      emailVerified: false,
      password: "pialunobrintec",
    }).then(function (newUser: any) {

      console.log("criarUsuario. Usuario criado com sucesso. id: ", newUser.uid);

      DatabaseReferences.Usuario.doc(newUser.uid).set({
        ativo: usuarioNovo.ativo,
        email: usuarioNovo.email,
        matricula: usuarioNovo.matricula,
        nome: usuarioNovo.nome,
        rota: usuarioNovo.rota,
        turma: [usuarioNovo.turma],
        professor: false,
      })

    }).catch(function (error: any) {
      console.log("criarUsuario. Error creating new user:", error);
    });
  }




}