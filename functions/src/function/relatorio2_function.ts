'use strict';

// const functions = require('firebase-functions');
const admin = require('firebase-admin');
import DatabaseReferences from "../database-references";

admin.initializeApp();
const express = require('express');
const cors = require('cors')({ origin: true });
export const app = express();

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

app.use(cors);
const json2csv = require("json2csv").parse;
// app.use(validateFirebaseIdToken);
// /listadealunodaturma?turmaId=erqq
app.get('/listadealunodaturma', (request: any, response: any) => {
    let turmaId = request.query.turmaId;
    console.log("listadealunodaturma", turmaId);
    let planilha: any = [];

    // report.push({ a: request.query.turmaId, b: 1 }); // your object
    DatabaseReferences.db.collection('Turma').doc(request.query.turmaId).get().then((document) => {
        let doc = document.data;
        console.log("listadealunodaturma" + doc.nome);
        if (!document.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', document.data());

          }
        planilha.push({ a: 'turmaId', b: turmaId });
        // planilha.push({ a: 'Nome', b: doc });

    }).catch((err) => {
        console.log("listadealunodaturma. Erro. Id: " + turmaId);
    })




    const csv = json2csv(planilha)
    response.setHeader(
        "Content-disposition",
        "attachment; filename=report.csv"
    )
    response.set("Content-Type", "text/csv")
    response.status(200).send(csv)


});

// exports.app = functions.https.onRequest(app);
