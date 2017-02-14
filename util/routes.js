var imports = require('./barrel');
var router = imports.express.Router();

// router.route('/movie').get(movieCtrl.getMovie);

router.route('/', (req, res) => {
	var data = imports.badgeService.getBadges((data) => {
		res.render('index', { title: 'Badge List', message: 'Your badges!', badges:data })
	});
});

module.exports = router;