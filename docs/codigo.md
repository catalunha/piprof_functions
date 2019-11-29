
// const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
//     console.log('Check if request is authorized with Firebase ID token');

//     if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
//         !(req.cookies && req.cookies.__session)) {
//         console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
//             'Make sure you authorize your request by providing the following HTTP header:',
//             'Authorization: Bearer <Firebase ID Token>',
//             'or by passing a "__session" cookie.');
//         res.status(403).send('Unauthorized');
//         return;
//     }

//     let idToken;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//         console.log('Found "Authorization" header');
//         // Read the ID Token from the Authorization header.
//         idToken = req.headers.authorization.split('Bearer ')[1];
//     } else if (req.cookies) {
//         console.log('Found "__session" cookie');
//         // Read the ID Token from cookie.
//         idToken = req.cookies.__session;
//     } else {
//         // No cookie
//         res.status(403).send('Unauthorized');
//         return;
//     }

//     try {
//         const decodedIdToken = await admin.auth().verifyIdToken(idToken);
//         console.log('ID Token correctly decoded', decodedIdToken);
//         req.user = decodedIdToken;
//         next();
//         return;
//     } catch (error) {
//         console.error('Error while verifying Firebase ID token:', error);
//         res.status(403).send('Unauthorized');
//         return;
//     }
// };


// function atualizeIsto(turmaId: any) {
//     DatabaseReferences.db.collection('Turma').doc(turmaId).get().then((document: any) => {
//         if (!document.exsists) {
//             console.log('No such document!');

//         }
//         let doc = document.data();

//         console.log(doc.nome);
//     }).catch((err) => {
//         console.log("falha");

//     });
// }


// function atualizeIsto(turmaId: any) {
//     DatabaseReferences.db.collection('Turma').doc(turmaId).get().then(salvar).catch(tratarErroBasicos);
// }


// function salvar(document: any) {
//     if (!document.exists) {
//         console.log('No such document!');
//     }
//     let doc = document.data();

//     console.log(doc.nome);
// }

// function tratarErroBasicos(err: any) {
//     console.log(" >> " + err)
// }

// exports.app = functions.https.onRequest(app);


// function chamada() {
//     let valor;
//     exemploAsync().then(vtest => {
//         valor = vtest;
//         console.log(valor)
//     }).catch(() => {

//     });

// }

// async function exemploAsync() {
//     return "teste";
// }