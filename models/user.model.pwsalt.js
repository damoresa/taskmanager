const bcrypt = require('bcrypt');

const passwordsalt = (next) => {
	// Generate a new salt for the hash
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		// Hash the password with the generated salt
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});
};

module.exports = passwordsalt;