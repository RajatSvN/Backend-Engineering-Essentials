const app = require('express')()

const APPID = process.env.APPID

app.get("/", (req, res) => {

   res.send("Hello From Docker Container. My AppId is " + APPID)

})


app.get("/app1", (req, res) => {

  res.send("App1 on AppId " + APPID)

})


app.get("/app2", (req, res) => {

  res.send("App2 on AppId " + APPID)

})


app.get("/admin", (req, res) => {

 res.send("Possible Restricted Page on " + APPID)

})

app.listen(9999, () => { console.log("App running on Port 9999") })
