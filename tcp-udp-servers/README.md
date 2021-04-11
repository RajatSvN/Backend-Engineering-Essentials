# TCP v/s UDP Server Comparison

TCP and UDP are Layer 4 communication protocols. TCP is an acknowledgment based and a connection based protocol whereas UDP is a stateless protocol. Each of the protocol has its own sets of pros and cons and based upon use cases you one can make a decision of choosing between UDP and TCP.

The TCP and UDP Servers here are implemented using Node.js. 

# Testing the TCP Server

You need to have a telnet client installed on your Windows, Linux or MAC.

Start the server using 

```sh
$ node tcp.js
```

Set up connection with TCP server by issuing the following command

```sh
$ telnet 127.0.0.1 8080
```
# Testing the UDP Server

You need to have netcat installed on your Windows, Linux or MAC.

Start the server using 

```sh
$ node udp.js
```

Since UDP is connection less one does not need to establish a connection you can directly send data to server using netcat

```sh
$ echo "Message from Client" | nc -w1 -u 127.0.0.1 8081
```

 
