module.exports = class AuthService {
	constructor(db){
		this.db = db;
	}


	verifyToken(token, cb) {
		this.db.collection('users').find( { device_token: token.toString() } ).toArray((err, data) => {
			// Here we could set the user's token to something else and then return the new user to the client
			// so they'd be getting a new token each request. This would make it literally impossible to crack.
			cb(data.length ? true : false);
		});
	}
}