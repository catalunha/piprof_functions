'use strict';

// const admin = require('firebase-admin');
// admin.initializeApp();
import DatabaseReferences from "../database-references";
import { construirListaDeAlunoDaTurma } from "./relatorios_function/lista_aluno_turma";

const express = require('express');
const cors = require('cors')({ origin: true });
export const app = express();

app.use(cors);
const json2csv = require("json2csv").parse;
// /listadealunodaturma?pedido=Relatorio/relatorioId
app.get('/listadealunodaturma', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    console.log("ListaDeAlunoDaTurma :: Pedido: ", pedidoId);
    // let planilha: any = [];
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            console.log('No such docRelatorio!');
            throw new Error("OH OH!");
        }
        let relatorio = docRelatorio.data();
        console.log("ListaDeAlunoDaTurma. Relatorio id " + docRelatorio.id);

        construirListaDeAlunoDaTurma(relatorio.turmaId).then((planilha) => {
            const csv = json2csv(planilha)
            response.setHeader(
                "Content-disposition",
                "attachment; filename=report.csv"
            )
            response.set("Content-Type", "text/csv")
            response.status(200).send(csv)
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                console.log("listadealunodaturma. Deletado  pedidoId: " + pedidoId);
              })

        }).catch((err) => {
            response.status(403).send(err)
        });
       

    }).catch((err) => {
        response.status(403).send('pedido nao existe')
    });


});


