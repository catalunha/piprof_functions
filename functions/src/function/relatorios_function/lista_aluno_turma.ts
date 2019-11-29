import DatabaseReferences from "../../database-references";


export function construirListaDeAlunoDaTurma(turmaId: any) {

  return new Promise((resolve, reject) => {

      let planilha: any = [];
      DatabaseReferences.db.collection('Turma').doc(turmaId).get().then((document: any) => {
          if (!document.exists) {
              console.log('construirListaDeAlunoDaTurma. No such document!');
              reject("Turma !document.exists")
          }
          let doc = document.data();
          console.log("construirListaDeAlunoDaTurma. turmaId: " + document.id);


          planilha.push({ a: 'turmaId', b: turmaId });
          planilha.push({ a: 'Nome', b: doc.nome });
          planilha.push({ a: 'ativo', b: doc.ativo });
          planilha.push({ a: 'instituicao', b: doc.instituicao });
          planilha.push({ a: 'componente', b: doc.componente });
          planilha.push({ a: 'descricao', b: doc.descricao });

          DatabaseReferences.db.collection('Usuario').where('turma', 'array-contains', turmaId).get().then( (queryListaDeAlunos) => {
            console.log("construirListaDeAlunoDaTurma. queryListaDeAlunos.size: " + queryListaDeAlunos.size);
            let listaDeAlunos = queryListaDeAlunos.docs;
              planilha.push({ c: 'foto', d: 'nome', e: 'matricula', f: 'email', g: 'celular', h: 'cracha' });
              listaDeAlunos.forEach((usuario: any, index: any, array: any) => {
                let aluno = usuario.data();
                console.log("construirListaDeAlunoDaTurma. aluno: " + usuario.id);
                planilha.push({ c: '=IMAGE("'+aluno.foto.url+'")', d: aluno.nome, e: aluno.matricula, f: aluno.email, g: aluno.celular, h: aluno.cracha });
                if ((index + 1) >= array.length) {
                      resolve(planilha);//return do then
                  }
              });

          }).catch((err) => {
              reject("erro nao encontrei lista de usuarios desta turma.")//return do catch
          });

      }).catch((err) => {
          reject("erro nao encontrei a turma.")
          console.log("listadealunodaturma. Erro. Id: " + turmaId);
      });

  });

}
