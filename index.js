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

//Tells the server to parse out URL encoded form data
app.use(bodyParser.urlencoded({extended: true}))



//Tells the renderer which engine to use
app.set('view engine', 'pug')


app.get('/badges', (req, res) => {
	db.collection('badges').find().toArray((err, data) => {
		// //Renders the pugh index view
		// res.render('index', {title: 'Home', message: 'List of badges!', badges: data});
		res.send(data);
	});
})


//Grabs a badge with a given ID
app.get('/badge/:id', (req, res) => {
	db.collection('badges').find( { ID: +req.params.id } ).toArray((err, data) => {
		res.send(data);
	});
});

//Grabs all the badges
app.get('/newbadge', (req, res) => {
	res.render('newBadge', { title: 'New Badge'})
});


//Creates a new Badge
app.post('/newbadge', (req, res) => {
	db.collection('badges').save(req.body, (err, results) => {
		if(err) throw err;
		res.redirect('/');
	});
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})