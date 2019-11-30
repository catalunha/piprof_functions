import DatabaseReferences from "../../database-references";
import { Timestamp } from "@google-cloud/firestore";


export function construirListaDeEncontros(turmaId: any) {
    return new Promise((resolve, reject) => {
        let planilha: any = [];
        planilha.push({ aluno_mat: '',aluno_nome:'' });

        DatabaseReferences.db.collection('Usuario').where('turma', 'array-contains', turmaId).get().then((queryListaDeAlunos) => {
            console.log("construirListaDeEncontros. queryListaDeAlunos.size: " + queryListaDeAlunos.size);
            let listaDeAlunos = queryListaDeAlunos.docs.sort();
            // planilha.push({ c: 'foto', d: 'nome', e: 'matricula', f: 'email', g: 'celular', h: 'cracha' });


            DatabaseReferences.db.collection('Encontro').where('turma.id', '==', turmaId).get().then((queryListaDeEncontros) => {
                console.log("construirListaDeEncontros. queryListaDeEncontros.size: " + queryListaDeEncontros.size);
                let listaDeEncontros = queryListaDeEncontros.docs;
                // let linha: any;
                // let encontroNome = {};
                // let encontroData = {};
                const encontroNome: {[index: string]:any} = {}
                const encontroData: {[index: string]:any} = {}

                listaDeEncontros.forEach((encontroDoc: any, index: any, array: any) => {
                    let encontro = encontroDoc.data();
                    let encontroId = encontroDoc.id;
                    console.log("construirListaDeEncontros. encontroMap do encontroId: " + encontroDoc.id);
                    encontroNome[encontroId]='=HYPERLINK("' + encontro.url + '";"' + encontro.nome + '")';
                    encontroData[encontroId]= encontro.inicio != null ? (encontro.inicio as Timestamp ).toDate().toLocaleString() : '';
                });

                planilha.push(encontroNome);
                planilha.push(encontroData);
                console.log("construirListaDeEncontros. encontroMap. Planilha: " + planilha);
                
                listaDeAlunos.forEach((alunoDoc: any, index: any, array: any) => {
                    const alunoMarcadoMap: {[index: string]:any} = {}

                    // let alunoMarcadoMap = {};
                    let aluno: any = alunoDoc.data();
                    let alunoId: any = alunoDoc.id;
                    alunoMarcadoMap['aluno_mat']= aluno.matricula ;
                    alunoMarcadoMap['aluno_nome']= aluno.nome ;
                    console.log("construirListaDeEncontros. alunoId: " + alunoId);

                    listaDeEncontros.forEach((encontroDoc: any) => {
                        let encontro: any = encontroDoc.data();
                        let encontroId: any = encontroDoc.id;
                        if (encontro.aluno.includes(alunoId)) {
                            alunoMarcadoMap[encontroId]= "P" ;
                        }else{
                            alunoMarcadoMap[encontroId]= "a" ;
                        }
                    });
                    planilha.push(alunoMarcadoMap);
                    if ((index + 1) >= array.length) {
                        resolve(planilha);//return do then
                    }
                });

                // mapEncontroNomeData(listaDeEncontros).then((myData: any) => {
                //     planilha.push(myData[0]);
                //     planilha.push(myData[1]);
                //     mapAlunoEncontro(listaDeAlunos,listaDeEncontros).then((myData)=>{
                //         planilha.push(myData)
                //     })
                // })

            }).catch((err) => {
                reject('Desculpe. Collection Turma ou documento não encontrado para construirListaDeEncontros turmaId' + turmaId)
                console.log("construirListaDeEncontros. Erro. Collection Turma ou documento não encontrado para turmaId: " + turmaId);
            });
        }).catch((err) => {
            reject("Desculpe. Nao encontrei lista de usuarios para esta turmaId" + turmaId + '. ' + err)//return do catch
        });
    });

}


// function mapEncontroNomeData(listaDeEncontros: any) {
//     let myData: any = [];
//     let encontroNome = {};
//     let encontroData = {};
//     return new Promise((resolve, reject) => {
//         listaDeEncontros.forEach((encontroDoc: any, index: any, array: any) => {
//             let encontro: any = encontroDoc.data();
//             let encontroId = encontroDoc.id;
//             console.log("construirListaDeEncontros. turmaId: " + encontroDoc.id);

//             encontroNome = { [encontroId]: '=HYPERLINK("' + encontro.url + '";"' + encontro.nome + '")' };
//             encontroData = { [encontroId]: encontro.inicio != null ? (encontro.inicio as Timestamp).toDate().toLocaleString() : '' };
//             // planilha.push({ a: 'turmaId', b: turmaId });
//             // planilha.push({ a: 'turma', b: encontro.turma.nome });
//             // planilha.push({ a: 'encontroId', b: encontroDoc.id });
//             // planilha.push({ a: 'inicio', b: encontro.inicio });
//             // planilha.push({ a: 'fim', b: encontro.fim });
//             // planilha.push({ a: 'modificado', b: encontro.modificado });
//             // planilha.push({ a: 'descricao', b: encontro.descricao });

//             // listaDeAlunos.forEach((usuarioDoc: any, index: any, array: any) => {
//             //     let aluno = usuarioDoc.data();
//             //     console.log("construirListaDeEncontros. aluno: " + usuarioDoc.id);
//             //     planilha.push({ aluno_foto: '=IMAGE("' + aluno.foto.url + '")', aluno_mat: aluno.matricula, aluno_nome: aluno.nome });
//             // });


//             if ((index + 1) >= array.length) {
//                 myData.push(encontroNome);
//                 myData.push(encontroData);

//                 resolve(myData);//return do then
//             }
//         });
//     })

// }


// function mapAlunoEncontro(listaDeAlunos: any, listaDeEncontros: any, ) {
//     let myData: any = [];
//     return new Promise((resolve, reject) => {
//         listaDeAlunos.forEach((alunoDoc: any, index: any, array: any) => {
//             // let aluno: any = alunoDoc.data();
//             // let alunoId: any = alunoDoc.id;
//             mapMarcarAlunoNoEncontro(alunoDoc, listaDeEncontros).then((alunoMarcado) => {
//                 myData.push(alunoMarcado);
//             })
//             if ((index + 1) >= array.length) {
//                 resolve(myData);//return do then
//             }
//         });
//     })

// }

// function mapMarcarAlunoNoEncontro(alunoDoc: any, listaDeEncontros: any, ) {
//     // let myData = [];
//     let alunoMarcadoMap = {};
//     let aluno: any = alunoDoc.data();
//     let alunoId: any = alunoDoc.id;

//     return new Promise((resolve, reject) => {
//         listaDeEncontros.forEach((encontroDoc: any, index: any, array: any) => {
//             let encontro: any = encontroDoc.data();
//             let encontroId: any = encontroDoc.id;
//             alunoMarcadoMap = { ['a']: aluno.nome };
//             if (encontro.aluno.includes(alunoId)) {
//                 alunoMarcadoMap = { [encontroId]: "x" };
//             }
//             if ((index + 1) >= array.length) {
//                 resolve(alunoMarcadoMap);//return do then
//             }
//         });
//     })

// }