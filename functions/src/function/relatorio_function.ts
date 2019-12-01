'use strict';

// const admin = require('firebase-admin');
// admin.initializeApp();
import DatabaseReferences from "../database-references";
import { construirListaDeAlunosDaTurma } from "./relatorios_function/lista_alunos_turma";
import { construirListaDeTarefasDoAluno } from "./relatorios_function/lista_notas_aluno";
import { construirListaDeEncontros } from "./relatorios_function/lista_encontros";
import { construirListaDeTarefasDaAvaliacao } from "./relatorios_function/lista_tarefas_avaliacao";
import { construirListaProblemasDaPasta } from "./relatorios_function/lista_problemas_pasta";
import { construirListaDeSimulacoesDoProblema } from "./relatorios_function/lista_simulacao_problema";

const express = require('express');
const cors = require('cors')({ origin: true });
export const app = express();

app.use(cors);
// https://www.npmjs.com/package/json-2-csv-ts
// https://www.npmjs.com/package/json-2-csv
// https://www.npmjs.com/package/json2csv
const json2csv = require("json2csv").parse;



// /listadeencontros?pedido=<relatorioId>
app.get('/listadeencontros', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaDeEncontros :: Pedido id: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaDeEncontros.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaDeEncontros.");
        }
        let relatorio = docRelatorio.data();
        // //console.log("ListaDeEncontros. Relatorio id: " + docRelatorio.id);
        construirListaDeEncontros(relatorio.turmaId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaDeEncontros.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("ListaDeEncontros. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaDeEncontros' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaDeEncontros.' + err);
    });
});


// /listadealunosdaturma?pedido=<relatorioId>
app.get('/listadealunosdaturma', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaDeAlunosDaTurma :: Pedido id: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaDeAlunosDaTurma.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaDeAlunosDaTurma.");
        }
        let relatorio = docRelatorio.data();
        //console.log("ListaDeAlunosDaTurma. Relatorio id: " + docRelatorio.id);
        construirListaDeAlunosDaTurma(relatorio.turmaId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaDeAlunosDaTurma.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("listadealunosdaturma. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaDeAlunosDaTurma' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaDeAlunosDaTurma.' + err);
    });
});


// /listadetarefasdoaluno?pedido=<relatorioId>
app.get('/listadetarefasdoaluno', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaDeTarefasDoAluno :: Pedido id: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaDeTarefasDoAluno.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaDeTarefasDoAluno.");
        }
        let relatorio = docRelatorio.data();
        //console.log("ListaDeTarefasDoAluno. Relatorio id: " + docRelatorio.id);
        construirListaDeTarefasDoAluno(relatorio.usuarioId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaDeTarefasDoAluno.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("ListaDeTarefasDoAluno. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaDeTarefasDoAluno' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaDeTarefasDoAluno.' + err);
    });
});



// /listadetarefasdaavaliacao?pedido=<relatorioId>
app.get('/listadetarefasdaavaliacao', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaDeTarefasDaAvaliacao :: relatorioId: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaDeTarefasDaAvaliacao.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaDeTarefasDaAvaliacao.");
        }
        let relatorio = docRelatorio.data();
        construirListaDeTarefasDaAvaliacao(relatorio.avaliacaoId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaDeTarefasDaAvaliacao.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("ListaDeTarefasDaAvaliacao. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaDeTarefasDaAvaliacao' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaDeTarefasDaAvaliacao.' + err);
    });
});



// /listaproblemasdapasta?pedido=<relatorioId>
app.get('/listaproblemasdapasta', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaProblemasDaPasta :: relatorioId: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaProblemasDaPasta.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaProblemasDaPasta.");
        }
        let relatorio = docRelatorio.data();
        construirListaProblemasDaPasta(relatorio.pastaId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaProblemasDaPasta.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("ListaProblemasDaPasta. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaProblemasDaPasta' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaProblemasDaPasta.' + err);
    });
});


// /listadesimulacoesdoproblema?pedido=<relatorioId>
app.get('/listadesimulacoesdoproblema', (request: any, response: any) => {
    let pedidoId = request.query.pedido;
    //console.log("ListaDeSimulacoesDoProblema :: relatorioId: ", pedidoId);
    DatabaseReferences.db.collection('Relatorio').doc(pedidoId).get().then((docRelatorio: any) => {
        if (!docRelatorio.exists) {
            //console.log('Desculpe. Collection Relatorio ou documento não encontrado para ListaDeSimulacoesDoProblema.');
            throw new Error("Desculpe. Collection Relatorio ou documento não encontrado para ListaDeSimulacoesDoProblema.");
        }
        let relatorio = docRelatorio.data();
        construirListaDeSimulacoesDoProblema(relatorio.problemaId).then((planilha) => {
            const csv = json2csv(planilha);
            response.setHeader(
                "Content-disposition",
                "attachment; filename=ListaDeSimulacoesDoProblema.csv"
            );
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            DatabaseReferences.db.collection('Relatorio').doc(pedidoId).delete().then(() => {
                //console.log("ListaDeSimulacoesDoProblema. Deletado  pedidoId: " + pedidoId);
            })
        }).catch((err) => {
            response.status(403).send('Desculpe. Não foi possível construir a ListaDeSimulacoesDoProblema' + err);
        });
    }).catch((err) => {
        response.status(403).send('Desculpe. Não existe pedido autenticado para ListaDeSimulacoesDoProblema.' + err);
    });
});
