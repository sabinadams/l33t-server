//Core Imports
var express = require('express')
var MongoClient = require('mongodb').MongoClient
var bodyParser= require('body-parser')
var app = express()
var colors = require('colors/safe');

//MongoDB Connection
var db;
MongoClient.connect('mongodb://root:798140sa@ds153239.mlab.com:53239/nodexpress', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

//Services
var AuthService = require('./services/authService');

app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})) //Tells the server to parse out URL encoded form data

//Middleware to check for bearer token and authenticate/validate user
app.use((req, res, next) => {
  let _authService = new AuthService(db);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

  if(req.method == 'OPTIONS'){
  	return res.status(200).send({message: "Preflight check successful"});
  }
  if(req.url == '/login'){
  	return next();
  }
  if(req.headers.authorization){
  	let bearer = req.headers.authorization.split(`Bearer `)[1];
	_authService.verifyToken(bearer, (data) => {
		if(data) return next();
		else return res.status(401).send({message: "Not Authenticated"});
	});
  } else {
	return res.status(401).send({message: "Not Authenticated."})
  }
})

//Tells the renderer which engine to use
app.set('view engine', 'pug');


// ***************************************************************************************
//
// Page Renders Stuff
//
// ***************************************************************************************

// app.get('/', (req, res) => {
// 	res.render('index', {title:"Badge Site"});
// });

//Grabs a badge with a given ID
// app.get('/badge/:id', (req, res) => {
// 	let _badgeService = new BadgeService(db);
// 	_badgeService.getBadgeByID(+req.params.id, (data) => {
// 		res.send(data);
// 	});
// });


// ***************************************************************************************
//
// Auth Stuff
//
// ***************************************************************************************

app.post('/login', (req, res) => {
	let _authService = new AuthService(db);
	_authService.login(req.body, data => {
		return res.send( data != false ? {status: 200, user: data} : {status: 401, error: 'Invalid Login'});
	});
});



app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});