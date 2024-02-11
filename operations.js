const save_data = require("./auth")

// List after auth
function list_user(rl, obj_user){
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
                console.log("wrong choice")
        }
    })
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

module.exports = list_user