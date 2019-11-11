import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// /**
//  * USUARIO
//  */
// import * as usuarioFunction from './funcoes/usuario_function';

// exports.UsuarioOnUpdate = functions.firestore.document('Usuario/{usuarioId}').onUpdate(usuarioFunction.iniciarUpdateCollectionUsuario);

// exports.usuarioOnCreateFunction = functions.firestore.document('Usuario/{uploadId}').onCreate(usuarioFunction.iniciarCreateCollectionUsuario);



/**
 * Cadastro
 */

import * as usuarioNovoFunction from './funcoes/usuario_novo_function';

exports.UsuarioNovoOnCreate = functions.firestore.document('UsuarioNovo/{usuarioNovoId}').onCreate(usuarioNovoFunction.iniciaOnCreate);
