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
                console.log(obj_user.balance,"MAD") //display balance
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
                console.log("wrong choice")
                rl.close() //n
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
        save_data()
        rl.close()
    })
}
//save the current update
function save_data(){
    const json_str = JSON.stringify(users, null, 2);
    fs.writeFileSync('new_out.json', json_str);
}

//deposit money
function deposit_money(obj){
    rl.question("add your money :",amount=>{
        obj.transactions.push({"type": "deposit","amount": parseInt(amount),"date": time})
        obj.balance = obj.balance + parseInt(amount)
        console.log(obj)
        save_data()
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
                    list_user(check_pin)
                }
                else{
                    console.log("You typed wrong pin")
                    rl.close()
                }
            })
        }
        else{
            console.log("You typed wrong ID")
            rl.close()
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
//creat object for new users
async function data_user(name, pin){
    let ndx = users.length //the index of an array
    //i wanna call last element in the array in json file
    let id = accountID(users[ndx-1].accountID)//it will generate new acountID
    console.log(id)
    let balance = 0 //intiliaze the balance with 0 for new users 
    let transactions = [] //inside this array it is gonna be the withdraw and deposit with thier date
    const new_obj = {"accountID":id, "name":name,"pin":pin, "balance":balance, "transactions": transactions}
    users.push(new_obj)
    save_data()
}

//add new user and generate its pin
function add_user(){
    rl.question("add your fullname : ",name=>{
        let pin = Math.floor((Math.random()*9000) + 1000)//generating the pin
        data_user(name, pin)
        console.log("========")
        rl.close()
    })
}

// first list 
rl.question("1-sign up\n2-log in\nchose a number : ", x=>{
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











