const users = require("./new_out.json")
const fs = require('fs')
const readline = require("readline")

let crnt_date = new Date()
let time = crnt_date.toLocaleDateString()

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

// List after auth
function list_user(obj_user){
    rl.question("1-Checking Balance\n2-Depositing Money\n3-withdraw money\n4-transaction history\n=> choose an operation : ",x=>{
        switch(x){
            case '1':
                console.log(obj_user.balance) //display balance
                rl.close()
                break;
            case '2':
                deposit_money(obj_user)
                break;
            case '3':
                withdraw_money(obj_user)
                break;
            case '4':
                transaction_history(obj_user)
                break;
            default:
                console.log("wrong number")
        }
    })
}

//transaction history
function transaction_history(obj){
    let new_arr = obj.transactions.map(x=>`${x.type} money ${x.amount} MAD in ${x.date}`)
    for (let i = 0; i < new_arr.length; i++){
        console.log(new_arr[i])
    }
    rl.close()
}

//withdraw money
function withdraw_money(obj){
    rl.question("how much money : ",amount =>{
        obj.transactions.push({"type": "withdraw","amount" : parseInt(amount),"date":time})
        obj.balance = obj.balance - parseInt(amount)
        console.log(obj)
        const json_str = JSON.stringify(users, null, 2);
        fs.writeFileSync('new_out.json', json_str);
        rl.close()
    })
}
//deposit money
function deposit_money(obj){
    rl.question("add your money :",amount=>{
        obj.transactions.push({"type": "deposit","amount": parseInt(amount),"date": time})
        obj.balance = obj.balance + parseInt(amount)
        console.log(obj)
        const json_str = JSON.stringify(users, null, 2);
        fs.writeFileSync('new_out.json', json_str);
        rl.close()
    })
}

// auth
function user_auth(){
    rl.question("Enter your account ID : ",id =>{
        const check_id = users.find(obj => obj.accountID == id) 
        if (typeof(check_id) == "object"){
            rl.question("Enter your pin : ",pin =>{
                const check_pin = users.find(obj=>obj.pin == pin)

                if (typeof(check_pin) == "object"){
                    console.log("Welcome", check_pin.name)
                    // list_user(check_pin.balance)
                    list_user(check_pin)
                }
                else{
                    console.log("You typed wrong pin")
                }
                // rl.close()
            })
        }
        else{
            console.log("You typed wrong ID")
        }
    })
}
// generate ID
function accountID(id){
    let str = id.split("")
    let st = ''
    for (let i = 3;i < str.length;i++){
        st = st + str[i]
    }
    let nmb = "ACC"+(parseInt(st) + 1)
return nmb
}
//update data to json file
async function data_user(name, pin){
    let ndx = users.length
    let id = accountID(users[ndx-1].accountID)
    console.log(id)
    let balance = 0
    let transactions = []
    const new_obj = {"accountID":id, "name":name,"pin":pin, "balance":balance, "transactions": transactions}
    users.push(new_obj)
    const jsonString = JSON.stringify(users, null, 2);
    fs.writeFileSync('new_out.json', jsonString);
}

//add new user
function add_user(){
    rl.question("add your fullname : ",name=>{
        let pin = Math.floor((Math.random()*9000) + 1000)
        data_user(name, pin)
        console.log("========")
        rl.close()
    })
}

// first list 
rl.question("1-sign up\n2-log in\nchose number : ", x=>{
    switch(x){
    case '1':
        console.log("-----------------------")
        add_user()
        break;
    case '2':
        user_auth()
        break;
    default:
        console.log("wrong number")
    }
})














// const { countReset } = require('console')
// const fs = require('fs')
// const readline = require("readline")
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
// // let obj_dt = {}
// function add_user(){
//     rl.question("add your fullname : ",name=>{
//         let pin = Math.floor(Math.random()*10000)
//         data_user(name, pin)
//         dis()
//     })
// }
// add_user()
// function dis(){
//     console.log("========")
//     rl.close()
// }
// function accountID(id){
//     let str = id.split("")
//     let st = ''
//     for (let i = 3;i < str.length;i++){
//         st = st + str[i]
//     }
//     let nmb = "ACC"+(parseInt(st) + 1)
// return nmb
// }
// async function data_user(name, pin){
//     const users = await require("./new_out.json")
//     let ndx = users.length
//     let id = accountID(users[ndx-1].accountID)
//     console.log(id)
//     const new_obj = {"accountID":id,"name":name,"pin":pin}
//     users.push(new_obj)
//     const jsonString = JSON.stringify(users, null, 2);
//     fs.writeFileSync("new_out.json",jsonString)
// }