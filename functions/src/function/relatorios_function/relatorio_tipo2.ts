import DatabaseReferences from "../../database-references";


export function contruirTipo2(turmaId: any, relatorio: any) {

  return new Promise((resolve, reject) => {

      let planilha: any = [];
      // report.push({ a: request.query.turmaId, b: 1 }); // your object
      DatabaseReferences.db.collection('Turma').doc(turmaId).get().then((document: any) => {
          if (!document.exists) {
              console.log('No such document!');
              reject("!document.exists")
          }
          let doc = document.data();
          console.log("listadealunodaturma" + doc.nome);

          planilha.push({ a: 'turmaId', b: turmaId });
          planilha.push({ a: 'Nome', b: doc.nome });

          DatabaseReferences.Usuario.where('turma', '==', turmaId).get().then(async (listaAlunos) => {
              let lista = listaAlunos.docs;
              lista.forEach((questao: any, index: any, array: any) => {
                  planilha.push({ a: 'Nome', b: doc.nome });

                  if ((index + 1) >= array.length) {
                      resolve(planilha);//then
                  }
              });

          }).catch((err) => {
              reject("erro nao encontrei lista de usuarios desta turma.")//catch
          });

      }).catch((err) => {
          reject("erro nao encontrei a turma.")
          console.log("listadealunodaturma. Erro. Id: " + turmaId);
      });

  });

}
