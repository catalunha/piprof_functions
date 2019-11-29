import DatabaseReferences from "../../database-references";


export function construirListaDeEncontros(turmaId: any) {
    return new Promise((resolve, reject) => {
        let planilha: any = [];
        DatabaseReferences.db.collection('Usuario').where('turma', 'array-contains', turmaId).get().then((queryListaDeAlunos) => {
            console.log("construirListaDeEncontros. queryListaDeAlunos.size: " + queryListaDeAlunos.size);
            let listaDeAlunos = queryListaDeAlunos.docs;
            planilha.push({ c: 'foto', d: 'nome', e: 'matricula', f: 'email', g: 'celular', h: 'cracha' });
         

            DatabaseReferences.db.collection('Encontro').where('turma.id', '==', turmaId).get().then((queryListaDeEncontros) => {
                console.log("construirListaDeEncontros. queryListaDeEncontros.size: " + queryListaDeEncontros.size);
                let listaDeEncontros = queryListaDeEncontros.docs;

                listaDeEncontros.forEach((encontroDoc: any, index: any, array: any) => {
                    let encontro = encontroDoc.data();

                    console.log("construirListaDeEncontros. turmaId: " + encontroDoc.id);

                    planilha.push({ a: 'encontroId', b: encontroDoc.id });
                    planilha.push({ a: 'nome', b: encontro.nome });

                    listaDeAlunos.forEach((usuario: any, index: any, array: any) => {
                        let aluno = usuario.data();
                        console.log("construirListaDeEncontros. aluno: " + usuario.id);
                        planilha.push({ c: '=IMAGE("' + aluno.foto.url + '")', d: aluno.nome, e: aluno.matricula, f: aluno.email, g: aluno.celular, h: aluno.cracha });
                    });


                    if ((index + 1) >= array.length) {
                        resolve(planilha);//return do then
                    }
                });


            }).catch((err) => {
                reject('Desculpe. Collection Turma ou documento não encontrado para construirListaDeEncontros turmaId' + turmaId)
                console.log("construirListaDeEncontros. Erro. Collection Turma ou documento não encontrado para turmaId: " + turmaId);
            });
        }).catch((err) => {
            reject("Desculpe. Nao encontrei lista de usuarios para esta turmaId" + turmaId + '. ' + err)//return do catch
        });
    });

}
