const express = require("express")
const app = express();

const port = 8080
const crypto = require("crypto")
const { Client } = require("pg")

const Ring = require('hashring')
const hashRing = new Ring()

// add shard server keys to the Hash Ring
hashRing.add("5432");
hashRing.add("5433");
hashRing.add("5434");

// client object for shard servers
const clients = {

	"5432": new Client({
		"host": "172.17.0.1",
		"port": 5432,
		"user": "postgres",
		"password": "password",
		"database": "postgres"
	}),

	"5433": new Client({
                "host": "172.17.0.1",
                "port": 5433,
                "user": "postgres",
                "password": "password",
                "database": "postgres"
        }),

	"5434": new Client({
                "host": "172.17.0.1",
                "port": 5434,
                "user": "postgres",
                "password": "password",
                "database": "postgres"
        })

}

const connect = async () => {

	try{
		await clients["5432"].connect()
		await clients["5433"].connect()
		await clients["5434"].connect()
	  }
	catch (e){
		console.log(e);
	}

}

connect()

app.get("/", (req, res) => {

	res.send("Welcome to Sharded URL Shortener Service");

})

app.get("/:urlId", async (req, res) => {
	
	const urlId = req.params.urlId

	const server = hashRing.get(urlId)

	let result = await clients[server].query("SELECT * FROM url_short WHERE url_id = $1", [urlId])

	if(result.rowCount > 0){
	    res.send({ "data": result.rows[0], server});	
	}else{
	    res.status(404).send()
	}


});

app.post('/', async (req, res) => {

	const url = req.query.url;
	
	// generate a hash for long url
	const hash = crypto.createHash("sha256").update(url).digest("base64");

	const urlId = hash.substr(0, 5)
	
	// get a server from the hash ring for the current url
	const server = hashRing.get(urlId)

	console.log(server)
	
	try{

		await clients[server].query(`INSERT INTO url_short(url, url_id) VALUES($1, $2)`, [url, urlId])


	} catch (e){

		console.log(e);

	}

	res.send({hash, urlId, server});

});


app.listen(port, () => {

	console.log(`App running on port ${port}`);

});
