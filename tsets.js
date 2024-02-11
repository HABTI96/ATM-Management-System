const test = require("./test.json")

const json = JSON.stringify(test, null, 2)
console.log(test) // array
console.log("=============")
console.log(json) //to string

//-------------------------------------
// let currentDate = new Date();

// let formattedDate = currentDate.toLocaleDateString();

// console.log(formattedDate);

//-------------------------------------

// const user = require("./test.json")
// user[0].transactions.push({"type":"deposit","amount":5})
// user[0].transactions.push({"type":"deposit","amount":6})

// console.log(user[0])

//-------------------------------------

// const user = require("./test.json")
// const arr = []
// arr.push({a:3,b:5})
// Object.assign(user[0],{type:arr})

// console.log(user[0])


  //-------------------------------------
  // const fnd = people.find(x=>x.age==30)
  // if (typeof(fnd) == "object") {
    // console.log(fnd)
    // console.log("nice")
    // }
    // else console.log("not found")
    
    //-------------------------------------
    // const people = [
//     { name: 'Alice', age: 30 },
//     { name: 'Bob', age: 25 },
//     { name: 'Charlie', age: 35 }
//   ];
// const fnd = people.find(x=>x.age==33)
// if (typeof(fnd) == "object") {
//     console.log("nice")
// }
// else console.log("not found")

// const a = 'ACC1002'
// let str = a.split("")
// let st = ''
// for (let i = 3;i < str.length;i++){
//     st = st + str[i]
// }
// let nmb = "ACC"+(parseInt(st) + 1)
// // return nmb

// console.log(nmb)