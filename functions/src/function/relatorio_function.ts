// import DatabaseReferences from "../database-references";
const admin = require('firebase-admin');
// admin.initializeApp();


// ON UPDATE

export function relatorioOnUpdate(docSnapShot: any) {
  // const docBeforeData = docSnapShot.before.data();
  // const docAfterData = docSnapShot.after.data();
  const docId = docSnapShot.after.id;

  console.log("relatorioOnUpdate :: " + docId);

  const bucket = admin.storage().bucket();
  const file = bucket.file("relatoriocsv_" + docId + '.csv');
  let buf = Buffer.from('a,b,c\nd,e,f');
  // buf equals <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
  
  return file.save(buf.buffer, {

      contentType: "text/plain",

  }).then(() => {

      // return snapRef.ref.set({
      //     pdfGerado: true,
      //     pdfGerar: false,
      // }, { merge: true });

  }).catch((err: any) => {

      console.log("savePdf Error: " + err)
  
  })



  return 0
}

// export function turmaOnDelete(docSnapShot: any) {
//   const docId = docSnapShot.id;
//   console.log("turmaOnDelete :: " + docId);
//   console.log("turmaOnDelete. Apagando Avaliacao | Encontro.");
//   DatabaseReferences.deleteDocumentGeneric('Avaliacao', 'turma.id', docId);
//   DatabaseReferences.deleteDocumentGeneric('Encontro', 'turma.id', docId);
//   return 0;
// }

