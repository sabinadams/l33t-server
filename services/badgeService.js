var exports = module.exports = {};
var MongoClient = require('../util/barrel').MongoClient;

var db;

MongoClient.connect('mongodb://root:798140sa@ds153239.mlab.com:53239/nodexpress', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

exports.getBadges = () => {
	db.collection('badges').find().toArray((err, data) => {
		return data;
	});
}