# Data Streaming API

The simplest example of Streaming I can think of is watching a random video on Youtube or any other Streaming 
Platform for that matter Netflix, Prime, Twitch and infinite others. 

Streaming APIs does exactly that, the two major use case beings,
1. Huge Available Data: In this case data is just too much to be transferred in a single http/REST Request
2. Live Data: The API in this case is polling different sources for events and transfers the data when event happens

In both of the above cases a simple API endpoint that does a fetch and dump would not be ideal. 

Streaming helps as you are essentially not pulling everything in the memory (Application Memory) but pulling some
chunk of data and transferring it. 

This is exactly what happens in Streaming Platforms, Downloading a Huge File, querying Huge Data form Databases etc.
Everything is not pulled at once.

This particular example focuses on streaming  a huge amount of Data stored in Database. 
Around 1 million records at once. This is a real scenario if you are dealing with a Huge amount of Data in general.

We will use MongoDB as our Database, Flask Streams for the API.

# Design

For initial setup I started with loading a million records in MongoDB. This [gist] pretty much explains that process.

Once Data is loaded we want to establish a connection with the Database and start pulling the Data.

The /stream/<records-per-page>/<total-record-count> api endpoint works as following

1. records-per-page tells how much records at a time we want to fetch from DB
2. total-record-count tells the total records we are fetching, in practical scenarios you will handle total record count
   differently but for science and simplicity let's keep it. 
   
Using above two parameters what we do exactly is first we calculate the total number of pages which is essentially

total pages = (total record count / records per page)

then we use this information to fetch a range of records (Using Database Cursor) for a given page and we do this 
continuously until all records are fetched.

As you might have guessed this is something similar to paging or pagination you see every where over the internet.
We are doing exactly that getting a chunk of Data and writing it to the Output/Response Stream.

If none of this makes sense just check app.py, it is python so there is a great chance python syntax will explain it 
better then plain english :)


# Application Code

Starting the application is simple you just need to have Python and pip (or any other package manager)

Also you might want to setup Mongo DB but then again it is not required as I will add Screenshot of Performance soon!

```sh
$ pip install flask
$ pip install flask_pymongo
$ flask run
```

# Testing Stuff Out

Use Curl, Postman or Browser Fetch to hit the GET /stream/<records-per-page>/<total-record-count> endpoint 
and analyse how requests are functioning, the timings, effect of changing above two paramaters etc. One can
check request timings easily using Chrome Dev Tools.

Request endpoint is: http://localhost:5000//stream/<records-per-page>/<total-record-count>
eg. http://localhost:5000//stream/10000/1000000

Note: Since this api dumps everything in the UI depending on your System specifications chrome might show an out of 
      memory error for all million records. That is fine as we generally do not put data like that on frontends, This
      is a science project made on weekend, so I hope you understand :)

# Request Timings for different type of requests

Coming Soon...
 
[gist]: <https://gist.github.com/RajatSvN/d9ecb196dcf0207e3a400c01b65e8bb1>

