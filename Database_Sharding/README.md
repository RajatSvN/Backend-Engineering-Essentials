# Database Sharding

Database Sharding is the process of splitting up of a very large relational table into smaller tables that are
distributed across different database servers in a network.

An added advantage of splitting a large relational table into a smaller table is a decent index size so that query
performances can be optimised.

This is also helpful when the application wants to distribute loads across categories for eg. splitting users based on their geographical locations, users from India accessing a particular database server whereas users from UK lets
say accessing another Database Server altogether.

However, Sharding a Database comes with it's own set of complexities and should only be used when absolutely necessary.

As a Practical Example this repo contains code for a distributed URL Shortening Service which is based on
Database Sharding in Postgres.

We would do a Hash Based Sharding, Range Based Sharding is another approach to go about Sharding.

# Design

There are 3 Postgres Servers running on Port 5432, 5433 & 5434. Each Server acts a Shard and contains a
single table containg an Auto Incrementing ID, Original URL and URL_ID (Short String).

The schema for the table is defined in the init.sql file.

We first create a custom docker image using the code in our Dockerfile which creates our url shortening table
everytime we spin a container using this image.

Use the following command,

```sh
$ docker build -t urlshard .
```

Now use this image to spin up 3 postgres servers on port 5432, 5433 and 5434.

```sh
$ docker run --name urlshard1 -e 'POSTGRES_PASSWORD+password' -p 5432:5432 -d urlshard
$ docker run --name urlshard2 -e 'POSTGRES_PASSWORD+password' -p 5433:5432 -d urlshard
$ docker run --name urlshard3 -e 'POSTGRES_PASSWORD+password' -p 5434:5432 -d urlshard
```

Make sure these 3 containers are running using the ``` $ docker ps ```  command.

Note: You can use GUI tools like [pgadmin] to view the changes in the table. 

# Application Code

Once our Database Infrastructure is up and running we can design our API using Node.js

API is simple and consists of two major endpoints a POST endpoint to shorten the url and a GET
endpoint to retrieve the original url back.

It is a Hash based Sharding and makes use of Concepts like [Consistent_Hashing] and [Hash_Rings]. This is used to
evenly distribute requests/data amongst servers.

A Hash Ring is theoretically a Circle on which Servers and Requests are mapped using a Hash Function. The request
gets assigned to the nearest server on the ring. It is a good technique to distribute load and gives a good performance even when servers are added or removed as compared to a linear hashtable.

The Application uses the built in Crypto library and SHA256 to convert incoming URL to a hash and npm hashring library for the [hashring] implementation.

You can access the API by making GET and POST request on end points defined in index.js

Do a , 

```sh
$ npm install
```

followed by,
```sh
$ node index.js
```

to get started.

# Testing Stuff Out

Use Curl, Postman or Browser Fetch to hit the POST endpoint and analyse how for different urls different servers
are assigned unoformly.  

Request endpoint is: http://localhost:8080/?url=<your_url_here>
 
[hashring]: <https://www.npmjs.com/package/hashring>
[pgadmin]: <https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html>
[Consistent_Hashing]: <https://en.wikipedia.org/wiki/Consistent_hashing>
[Hash_Rings]: <https://en.wikipedia.org/wiki/Consistent_hashing>