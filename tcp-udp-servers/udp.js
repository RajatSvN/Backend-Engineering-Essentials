const dgram = require('dgram')

// create an ipv4 socket, udp6 -> ipv6 
const server = dgram.createSocket('udp4')

server.on('message', (message, rinfo) => {
    console.log(`Server got ${message} from ${rinfo.address}:${rinfo.port}`)
})

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
})

server.on('listening', () => {
    const address = server.address()
    console.log(`server listening on ${address.address}:${address.port}`)
})

server.bind(8081)