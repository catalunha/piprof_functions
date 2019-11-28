const json2csv = require("json2csv").parse;

// const myData = {
//     id:"id",
//     name:"name",
//     comments:[
//         "first",
//         "second2",
//         "third"
//     ]
// }
 
// const myData = [
//     {
//       id:"1",
//       name:"test"
//     },
//     {
//       id:"2",
//       des:"desc"
//     }
//   ]
let myData= [];
myData.push({a:'1',b:'a'});
myData.push({a:'1',b:'a',c:'4'});
myData.push({d:'1',e:'a',c:'4'});


try {
    var result =json2csv(myData)
//   var result = json2csv(myData,{
//       expandArray:false
//   })
  console.log(result);
} catch (err) {
  console.error(err);
}