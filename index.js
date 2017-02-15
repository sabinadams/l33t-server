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

var BadgeService = require('./services/badgeService');

//Tells the server to parse out URL encoded form data
app.use(bodyParser.urlencoded({extended: true}))


app.use((req, res, next) => {
  //Check for bearer token here

  // if(req.headers.Authorization){
  	// Bearer aklsdjfa;lksjdflakjsdlfkjas;dlkjf
  	// let bearer = req.headers.Authorization.split(`Bearer `)[1];

	// if(_authService.verifyToken(bearer)){
  		// next();
	// }
  // }
  // res.status(401).send({message: "Not authenticated."})
  console.log('Validating Bearer Token...');
  next();
})

//Tells the renderer which engine to use
app.set('view engine', 'pug')


// ***************************************************************************************
//
// Badge Stuff
//
// ***************************************************************************************

//The homepage that shows all the badges
app.get('/', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.getBadges((data) => {
		res.render('index', {title: 'Home', message: 'List of badges!', badges: data});
	});
});

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

//Renders the new badge page
app.get('/newbadge', (req, res) => {
	res.render('newBadge', { title: 'New Badge'});
});


//Creates a new Badge
app.post('/newbadge', (req, res) => {
	let _badgeService = new BadgeService(db);
	_badgeService.saveBadge(req.body, (data) => {
		data ? res.redirect('/') : res.status(401).send({error: "There was a problem with this request."});
	});
});


// ***************************************************************************************
//
// Other Stuff
//
// ***************************************************************************************

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});