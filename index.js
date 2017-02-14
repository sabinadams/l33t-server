var express = require('express')
//Required to be able to use posted form data
const bodyParser= require('body-parser')
var app = express()
//Tells the server to parse out URL encoded form data
app.use(bodyParser.urlencoded({extended: true}))
var colors = require('colors/safe')

//MongoDB Connection
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://root:798140sa@ds153239.mlab.com:53239/nodexpress', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

//Tells the renderer which engine to use
app.set('view engine', 'pug')

// GET method route
app.get('/', (req, res) => {
  db.collection('badges').find().toArray((err, data) => {
  	res.render('index', { title: 'Badge List', message: 'Your badges!', badges:data })
  })
})

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