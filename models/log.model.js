const mongoose = require('mongoose');
const Schema = 	mongoose.Schema;

const logSchema = new Schema({
    date: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
