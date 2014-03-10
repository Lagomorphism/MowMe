var port = 4567
var util = require("util");
var express = require("express");
var app = express();

var mongo = require("mongodb");

var MONGO_URI = "mongodb://WebConnection:Bunny2010@ds027519.mongolab.com:27519/playground";

// Initialize the Mongo connection once, reuse the database object.
var db;
mongo.MongoClient.connect(MONGO_URI, function(error, database) {
	if (error) {
		throw error;
	}
	else {
		db = database;
		console.log("Connection made to database...");
	}
});

// Configure Express.
app.configure(function() {
	app.set("port", port);
	app.use(express.static(__dirname));
});

// Route configuration.
app.get("/", function(req, res) {
	res.render("index");
});

app.get("/login", function(req, res) {
	if (db != null) {
		usersCollection = db.collection("users");
		usersCollection.findOne({email: "jdoe@hotmail.com"}, function(error, doc) {
			if (error != null) {
				console.log("Oops, something went wrong: " + error)
				res.send(error)
				return;
			}
			console.log(doc);
			res.send(doc);
		});
	}
});

app.get("/mongodb", function(req, res) {
	var db = new mongo.Db("playground", new mongo.Server(""))
});

app.listen(port);
util.puts("Listening on port " + port + "...");
util.puts("Press CTRL + C to stop.");