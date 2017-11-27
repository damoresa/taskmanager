const mongoose = require('mongoose');
const Schema = 	mongoose.Schema;

const projectSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
