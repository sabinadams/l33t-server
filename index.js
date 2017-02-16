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
var BadgeService = require('./services/badgeService');
var AuthService = require('./services/authService');

//Tells the server to parse out URL encoded form data
app.use(bodyParser.urlencoded({extended: true}))

//Middleware to check for bearer token and authenticate/validate user
app.use((req, res, next) => {
  let _authService = new AuthService(db);
  req.headers['Authorization'] = 'Bearer 12345'; //Except this wouldn't have to be set, it'll be coming from the client
  if(req.headers.Authorization){
  	let bearer = req.headers.Authorization.split(`Bearer `)[1];
	_authService.verifyToken(bearer, (data) => {
		if(data) next();
		else res.status(401).send({message: "Not Authenticated"});
	});
  } else {
	res.status(401).send({message: "Not Authenticated."})
	next();
  }
})

//Tells the renderer which engine to use
app.set('view engine', 'pug');


// ***************************************************************************************
//
// Page Renders Stuff
//
// ***************************************************************************************

	app.get('/', (req, res) => {
		res.render('index', {title:"Badge Site"});
	})

	//The homepage that shows all the badges
	app.get('/home', (req, res) => {
		let _badgeService = new BadgeService(db);
		_badgeService.getBadges((data) => {
			res.render('home', {title: 'Home', message: 'List of badges!', badges: data});
		});
	});

	//Renders the new badge page
	app.get('/manageBadges', (req, res) => {
		res.render('manageBadges', { title: 'Manage Badges'});
	});


// ***************************************************************************************
//
// Badge Stuff
//
// ***************************************************************************************



//Grabs all the badges
app.get('/badges', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.getBadges((data) => {
		res.send(data);
	});
});

//Grabs a badge with a given ID
app.get('/badge/:id', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.getBadgeByID(+req.params.id, (data) => {
		res.send(data);
	});
});

//Creates a new Badge
app.post('/newbadge', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.saveBadge(req.body, (data) => {
		data ? res.send(data) : res.status(401).send({error: "There was a problem with this request."});
	});
});

//Deletes a badge
app.post('/deletebadge', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.deleteBadge(+req.body.id, (data) => {
		data ? res.status(200).send({success: "Successfully deleted badge."}) : res.status(401).send({error: "There was a problem with this request."});
	});
})


// ***************************************************************************************
//
// Auth Stuff
//
// ***************************************************************************************



// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});