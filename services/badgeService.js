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
			cb(err ? false : true);
		});
	}
}