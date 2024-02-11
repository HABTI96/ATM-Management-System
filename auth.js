const users = require("./new_out.json")
const fs = require('fs')
const list_user = require("./operations")



// auth
function user_auth(rl){
    rl.question("Enter your account ID : ",id =>{
        const check_id = users.find(obj => obj.accountID == id) 
        if (typeof(check_id) == "object"){
            rl.question("Enter your pin : ",pin =>{
                const check_pin = users.find(obj=>obj.pin == pin)
                if (typeof(check_pin) == "object"){
                    console.log("Welcome", check_pin.name)
                    list_user(rl, check_pin)
                }
                else{
                    console.log("You typed wrong pin")
                }
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
function data_user(name, pin){
    let ndx = users.length
    let id = accountID(users[ndx-1].accountID)
    console.log(id)
    let balance = 0
    let transactions = []
    const new_obj = {"accountID":id, "name":name,"pin":pin, "balance":balance, "transactions": transactions}
    users.push(new_obj)
    save_data()
}

//add new user
function add_user(rl){
    rl.question("add your fullname : ",name=>{
        let pin = Math.floor((Math.random()*9000) + 1000)
        data_user(name, pin)
        console.log("========")
        rl.close()
    })
}
//save the current update
function save_data(){
    const json_str = JSON.stringify(users, null, 2);
    fs.writeFileSync('new_out.json', json_str);
}

module.exports = {user_auth,add_user,save_data}