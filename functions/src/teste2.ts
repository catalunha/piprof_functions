let variavel= {
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
console.log('oi'+variavel.uid1.ordem);
let nota='=';

for (const [key, value] of Object.entries(variavel)) { 
  nota = nota + '+' + value.ordem;
  if(value.tipo=='url'||value.tipo=='texto'){
    console.log('--');
  }
  console.log(key, value.ordem);
}
console.log(nota);
