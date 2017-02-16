module.exports = class BadgeService {
	constructor(db){
		this.db = db;
	}


	getBadges(cb){
		let badges = [];
		this.db.collection('badges').find().toArray((err, data) => {
			cb(data);
		});
	}

	getBadgeByID(ID, cb){
		this.db.collection('badges').find( { ID: ID } ).toArray((err, data) => {
			cb(data);
		});
	}

	saveBadge(body, cb){
		this.db.collection('badges').save(body, (err, results) => {
			console.log(results.ops);
			cb(err ? false : results.ops[0]);
		});
	}

	deleteBadge(ID, cb){
		this.db.collection('badges').remove({ID: ID}, (err, res) => {
			console.log(res);
			cb(res);
		});
	}
}