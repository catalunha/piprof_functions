import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// USUARIO
import * as usuarioFunction from './function/usuario_function';
exports.UsuarioOnUpdate = functions.firestore.document('Usuario/{usuarioId}').onUpdate(usuarioFunction.UsuarioOnUpdate);
// nata exports.UsuarioOnUpdate = functions.firestore.document('Usuario/{usuarioId}').onUpdate(usuarioFunction.iniciarUpdateCollectionUsuario);
// nata exports.usuarioOnCreateFunction = functions.firestore.document('Usuario/{uploadId}').onCreate(usuarioFunction.iniciarCreateCollectionUsuario);

// UsuarioNovo
// import * as usuarioNovoFunction from './funcoes/usuario_novo_function';
// exports.UsuarioNovoOnCreate = functions.firestore.document('UsuarioNovo/{usuarioNovoId}').onCreate(usuarioNovoFunction.iniciaOnCreate);

// Turma
import * as turmaFunction from './function/turma_function';
exports.TurmaOnUpdate = functions.firestore.document('Turma/{turmaId}').onUpdate(turmaFunction.TurmaOnUpdate);

// Avaliacao
import * as avaliacaoFunction from './function/avaliacao_function';
exports.AvaliacaoOnUpdate = functions.firestore.document('Avaliacao/{avaliacaoId}').onUpdate(avaliacaoFunction.AvaliacaoOnUpdate);
exports.AvaliacaoOnDelete = functions.firestore.document('Avaliacao/{avaliacaoId}').onDelete(avaliacaoFunction.AvaliacaoOnDelete);

// Questao
import * as questaoFunction from './function/questao_function';
exports.QuestaoOnUpdate = functions.firestore.document('Questao/{questaoId}').onUpdate(questaoFunction.QuestaoOnUpdate);
exports.QuestaoOnDelete = functions.firestore.document('Questao/{questaoId}').onDelete(questaoFunction.QuestaoOnDelete);

// Pasta
import * as pastaFunction from './function/pasta_function';
exports.PastaOnUpdate = functions.firestore.document('Pasta/{pastaId}').onUpdate(pastaFunction.PastaOnUpdate);

// Situacao
import * as situacaoFunction from './function/situacao_function';
exports.SituacaoOnUpdate = functions.firestore.document('Situacao/{situacaoId}').onUpdate(situacaoFunction.SituacaoOnUpdate);
exports.SituacaoOnDelete = functions.firestore.document('Situacao/{situacaoId}').onDelete(situacaoFunction.SituacaoOnDelete);
