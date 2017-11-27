const mongoose = require('mongoose');
const Schema = 	mongoose.Schema;

const logSchema = mongoose.model('Log').schema;

const taskSchema = new Schema({
	code: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
    projectCode: { type: String, required: true },
	duration: { type: Number, required: true },
	open: { type: Boolean, default: true, required: true },
	progress: { type: Number, default: 0 },
	logs: [logSchema],
    linkedTasks: [String]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
