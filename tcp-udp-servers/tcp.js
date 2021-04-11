const net = require('net')

const port = 8080;
const host = '127.0.0.1'

const tcpServer = net.createServer(socket => {

    console.log(`TCP Server started on ${host}:${port}`)

    // socket is the client
    console.log(`${socket.remoteAddress}:${socket.remotePort} connected`)

    // when client sends data
    socket.on('data', data => {

        console.log(`${socket.remoteAddress}:${socket.remotePort} says ${data.toString()}`)

        socket.write(`Recieved your data`)

    })

    // when client closes connection
    socket.on('close', () => {

        console.log(`${socket.remoteAddress}:${socket.remotePort} closed the connection.`)

    })

    // when client faced a connection error 
    socket.on('error', error => {

        console.log(`${socket.remoteAddress}:${socket.remotePort} connection error: ${error}`)

    })

})

tcpServer.listen(port, host, () => {
    console.log(`TCP Server running on ${host}:${port}`)
})