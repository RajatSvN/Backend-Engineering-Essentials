// High Level JS XMPP Library
const xmpp = require('simple-xmpp')

xmpp.on("online", data => {

    console.log(`You are online and you are connected as ${data.jid.user}`)
    sendMessage()

})


xmpp.on("error", err => {

    console.log(`Something went wrong! ${err}`)

})

xmpp.on("chat", (from, msg) => {

    console.log(`Got a message: ${msg} from: ${from}`)

})

function sendMessage(){

    // send message every 10 seconds
    setTimeout(sendMessage, 10000)

    // 2nd user
    xmpp.send("admin@localhost", `Message from rajat on ${Date.now()}`)

}

xmpp.connect({

    "jid": "rajat@localhost",
    "password": "password",
    "host": "localhost",
    "port": 5222

})