# XMPP : eXtensible Messaging and Presence Protocol

It is a standardised protocol for Instant Messaging in which you can stream XML Elements to exchange messages and Presence Information in near real time. The protocol is used by instant messaging apps like WhatsApp.

Presence determines whether you are online/offline/busy. It indicates the state.

You can read more about XMPP [here]

# XMPP Server Demo using Node.js and eJabberd

First we will start the XMPP Server eJabberd using Docker

Start the server using 

```sh
$ docker run --name ejabberd -p 5222:5222 ejabberd/ecs
```

Note that 5222 is the default port for XMPP 

The server will now be running.

Now register two users on the XMPP Server.

```sh
$ docker exec -it ejabberd bin/ejabberdctl register admin localhost password
$ docker exec -it ejabberd bin/ejabberdctl register rajat localhost password
```

cd into the XMPP folder if you have not alread and do a npm install. It will install "simple-xmpp" a high level
XMPP Node JS XMPP Library.

```sh
$ npm install
```
Now run the index.js and rajat.js file separately. Both users will establish connection with the server and
you would be able to see messages being exchanged between the users.

```sh
$ node index.js
```

Now in a different terminal, 

```sh
$ node rajat.js
```

[here]: <https://xmpp.org/about/technology-overview.html>
