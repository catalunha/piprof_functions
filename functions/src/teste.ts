const json2csv = require("json2csv").parse;

// const myData = {
//     id:"id",
//     name:"name",
//     comments:[
//         "first1",
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
// let myData= [];
// myData.push({e:'1',b:'a'});
// myData.push({a:'1',b:'a',c:'4'});
// myData.push({d:'1',e:'a',c:'4'});

// let myData= [];
// myData.push({a:'.'});
// myData.push({e1:'e1n',e2:'e2n',});
// myData.push({e1:'e1d',e2:'e2d'});
// myData.push({a:'a1',e1:'x'});
// myData.push({a:'a2',e2:'x'});

let myData= [];
myData.push({a:'.'});
myData.push({e1:'e1n',e2:'e2n',});
myData.push({e1:'e1d',e2:'e2d'});
myData.push({a:'a1',e1:'x',e2:'x'});
myData.push({a:'a2',e2:'x'});

try {
  // var result = json2csv({ data: myData, unwindPath: 'comments' });
  // var result = json2csv(myData);
    // var result =json2csv(myData)
  var result = json2csv(myData,{
    expandArray:true,
    sortHeader:true
  })
  console.log(result);
} catch (err) {
  console.error(err);
}