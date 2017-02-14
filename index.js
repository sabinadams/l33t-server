var imports = require('./util/barrel');
imports.app.use('/services', imports.routes);
//MongoDB Connection


//Tells the server to parse out URL encoded form data
imports.app.use(imports.bodyParser.urlencoded({extended: true}))


//Tells the renderer which engine to use
imports.app.set('view engine', 'pug')



//Grabs all the badges
// imports.app.get('/newbadge', (req, res) => {
// 	res.render('newBadge', { title: 'New Badge'})
// });


//Creates a new Badge
// imports.app.post('/newbadge', (req, res) => {
// 	db.collection('badges').save(req.body, (err, results) => {
// 		if(err) throw err;
// 		res.redirect('/');
// 	});
// });

// POST method route
imports.app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})


imports.app.listen(3000, () => {
  console.log('Example imports.app listening on port 3000!')
})