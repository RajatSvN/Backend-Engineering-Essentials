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
   
Below request tries to fetch 100000 records from the database in chunks of 1000, the time taken everything included is 3.91 seconds
Implication being only 1000 records are loaded in the API Memory at a given time.

![image](https://user-images.githubusercontent.com/38208071/156127938-b81b94cf-b594-4643-a236-91c6f4b19170.png)

Below request fetches half a million records (500,000) in chunk size of 1000, the time taken is around 1.1 minutes 
![image](https://user-images.githubusercontent.com/38208071/156128895-6b088dd1-e6fa-4c4f-98a0-19c6f5058864.png)
   
Finally the big request to fetch all million records in chunk size of 1000, As you would see this took a while and request goes on for some time, 
It ran for around 6 minutes and at around that time it was able to fetch more than 750,000 + records 
![image](https://user-images.githubusercontent.com/38208071/156132005-928871a9-fdfd-4a69-99c4-0b1890ccf780.png)
   
However, as I mentioned before, putting so much data is not a brilliant approach, so Chrome ran out of memory resulting in this,
![image](https://user-images.githubusercontent.com/38208071/156132653-57a09a2f-0cff-4ec3-aa53-8d58a5737559.png)
   
Overall, It might be interesting to play around with different chunk sizes, total records and a more novel way to display data. 
I hope this elementary example helps you solve much bigger problems!
 
[gist]: <https://gist.github.com/RajatSvN/d9ecb196dcf0207e3a400c01b65e8bb1>

