var crypto = require('crypto');

module.exports = class AuthService {
	constructor(db){
		this.db = db;
	}
	//Creates randomized UUID Token for authentication
	_createUUID() {
		var d = new Date().getTime();
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
			let r = ( d + Math.random() * 16 ) % 16 | 0;
			d = Math.floor( d / 16 );
			return( c == 'x' ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
		});
	}

	verifyToken(token, cb) {
		this.db.collection('users').find( { device_token: token.toString() } ).toArray((err, data) => {
			// Here we could set the user's token to something else and then return the new user to the client
			// so they'd be getting a new token each request. This would make it literally impossible to crack.
			cb(data.length ? true : false);
		});
	}


	login(data, cb) {
		let password_hash = crypto.createHash('md5').update(data.password).digest('hex');
		this.db.collection('users').find( { password: password_hash, username: data.username } ).toArray((err, retrieve_data) => {
			if(retrieve_data.length == 1){
				let token = this._createUUID();
				this.db.collection('users').update({password: password_hash, username: retrieve_data[0].username}, {$set : {token: token}}, (err, update_data) => {
					cb({
						username: retrieve_data[0].username,
						email: retrieve_data[0].email,
						remember_me: retrieve_data[0].remember_me,
						token: token
					});
				});
			} else {
				cb(false);
			}
		});
	}
}