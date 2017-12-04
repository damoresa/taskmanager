const mongoose = require('mongoose');
const Schema = 	mongoose.Schema;

const passwordcomp = require('./user.model.pwcmp');
const passwordsalt = require('./user.model.pwsalt');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

// Encrypt the password before persisting the user
userSchema.pre('save', function(next) {
    // Check whether the user model is new or it's password has been changed
    if (this.isModified('password') || this.isNew) {
        // Generate a new salt for the hash
		passwordsalt(next);
    } else {
        return next();
    }
});

// Compare encrypted passwords
userSchema.methods.comparePassword = passwordcomp;

const User = mongoose.model('User', userSchema);
module.exports = User;
