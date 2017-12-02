const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = 	mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

// Encrypt the password before persisting the user
userSchema.pre('save', function (next) {
    var user = this;
    // Check whether the user model is new or it's password has been changed
    if (this.isModified('password') || this.isNew)
    {
        // Generate a new salt for the hash
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
            {
                return next(err);
            }
            // Hash the password with the generated salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else
    {
        return next();
    }
});

// Compare encrypted passwords
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err)
        {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
