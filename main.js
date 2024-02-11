const readline = require("readline")
const {user_auth,add_user} = require("./auth")

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.question("1-sign up\n2-log in\nchose number : ", x=>{
    switch(x){
    case '1':
        console.log("-----------------------")
        add_user(rl)
        break;
    case '2':
        user_auth(rl)
        break;
    default:
        console.log("wrong number")
    }
})
