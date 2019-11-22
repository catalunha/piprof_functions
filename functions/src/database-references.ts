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


/**
 * Atualizar uma documento específico de uma coleção com um json 
 * @param collectionName Coleção
 * @param documentId Documento
 * @param updateJsonData Dados no formato json
 */
  public static updateDocumentById(collectionName: any, documentId: any, updateJsonData: any) {
    console.log("updateDocumentById. Entrada Col.: " + collectionName + " field: " + documentId + " json" + updateJsonData);

    this.db.collection(collectionName).doc(documentId).update(updateJsonData).then(() => {
      console.log("updateDocumentById. Atualizado  Col.: " + collectionName + " id: " + documentId);

    }).catch((error: any) => {
      console.log("updateDocumentById. Error getting documents.  Col.: " + collectionName + " field: " + documentId + " json" + updateJsonData, error);
    })
  }

/**
 * Filtra os documentos de uma coleção que atendem a query de == e atualiza campos naquele documento conforme json
 * @param collectionName Nome da coleção onde iniciar a busca
 * @param fieldName Nome do campo a ser referenciado no where ==
 * @param value valor para comparação
 * @param updateJsonData json com campo e valor a ser alterado naquele documento encontrado
 */
  public static updateDocumentWhereEquals(collectionName: any, fieldName: any, value: any, updateJsonData: any) {
    console.log("updateDocumentWhereEquals. Entrada Col.: " + collectionName + " field: " + fieldName + " value: " + value + " json" + updateJsonData);

    this.db.collection(collectionName).where(fieldName, '==', value).get().then((querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach((docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).update(updateJsonData).then(() => {
            console.log("updateDocumentWhereEquals. Atualizado  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((error: any) => {
      console.log('updateDocumentWhereEquals. Error getting documents.  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + value, error)
    })
  }

/**
 * Filtra os documentos de uma coleção que atendem a query de arrayContains e atualiza campos naquele documento conforme json
 * @param collectionName Nome da coleção onde iniciar a busca
 * @param fieldName Nome do campo a ser referenciado no arrayContains
 * @param value valor que o array contem para comparação
 * @param updateJsonData json com campo e valor a ser alterado naquele documento encontrado
 */
  public static updateDocumentWhereArrayContains(collectionName: any, fieldName: any, value: any, updateJsonData: any) {
    console.log("updateDocumentWhereArrayContains. Entrada Col.: " + collectionName + " field: " + fieldName + " value: " + value + " json" + updateJsonData);

    this.db.collection(collectionName).where(fieldName, 'array-contains', value).get().then((querySnapShot: any) => {
      if (querySnapShot.docs.length > 0) {
        querySnapShot.docs.forEach((docRef: any) => {
          this.db.collection(collectionName).doc(docRef.id).update(updateJsonData).then(() => {
            console.log("updateDocumentWhereArrayContains. Atualizado  Col.: " + collectionName + " id: " + docRef.id);
          })
        })
      }
    }).catch((error: any) => {
      console.log('updateDocumentWhereArrayContains. Error getting documents.  Col.: ' + collectionName + ' fieldName: ' + fieldName + ' value: ' + value, error)
    })
  }

/**
 * 
 * @param collectionName Coleção
 * @param fieldName campo
 * @param value valor a ser filtrado para
 */
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
/**
 * Cria um novo documento na coleção Usuario
 * @param usuarioNovo Documento com os dados para criar um novo usuario
 */
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
        foto: usuarioNovo.foto,
        professor: false,
      })

    }).catch(function (error: any) {
      console.log("criarUsuario. Error creating new user:", error);
    });
  }




}