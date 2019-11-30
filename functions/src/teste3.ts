const { Parser } = require('json2csv');
 
const fields = ['carModel', 'price', 'colors1','colors2',];
const myCars = [
  {
    "carModel": "Audi",
    "price": 0,
    "colors1": ["blue","green","yellow"]
  }, {
    "carModel": "BMW",
    "price": 15000,
    "colors2": ["red","blue"]
  }, {
    "carModel": "Mercedes",
    "price": 20000,
    "colors3": "yellow"
  }, {
    "carModel": "Porsche",
    "price": 30000,
    "color4": ["green","teal","aqua"]
  }
];
 
const json2csvParser = new Parser({ fields, unwind: ['colors1','colors2',] });
const csv = json2csvParser.parse(myCars);
 
console.log(csv);