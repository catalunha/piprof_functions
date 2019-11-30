let variavel = {
  "uid1": {
    "ordem": 1,
    "nome": "",
    "tipo": "numero",
    "valor": ""
  },
  "uid2": {
    "ordem": 2,
    "nome": "",
    "tipo": "palavra",
    "valor": ""
  },
  "uid3": {
    "ordem": 3,
    "nome": "",
    "tipo": "texto",
    "valor": ""
  },
  "uid4": {
    "ordem": 4,
    "nome": "",
    "tipo": "url",
    "valor": ""
  },
  "uid5": {
    "ordem": 5,
    "nome": "",
    "tipo": "urlimagem",
    "valor": ""
  }
}
console.log('oi' + variavel.uid1.ordem);
let nota = '=';
// variavel['uid6'] =  {
//   "ordem": 6,
//   "nome": "",
//   "tipo": "urlimagem",
//   "valor": ""
// }
for (const [key, v] of Object.entries(variavel)) {
  // let k :any= key
  // let v :any= value
  nota = nota + '+' + v.ordem;
  if (v.tipo == 'url' || v.tipo == 'texto') {
    console.log('--');
  }
  console.log(key, v.ordem);
}
console.log(nota);
