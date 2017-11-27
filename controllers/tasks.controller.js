const express = require('express');
const winston = require('winston');

const Log = require('./../models/log.model');
const Task = require('./../models/task.model');

const mapLogs = (mongoLogModel) => {
    return {
        date: mongoLogModel.date,
        log: mongoLogModel.log,
        duration: mongoLogModel.duration
    }
};

const mapToModel = (mongoTaskModel) => {
    return {
        code: mongoTaskModel.code,
        name: mongoTaskModel.name,
        description: mongoTaskModel.description,
        duration: mongoTaskModel.duration,
        progress: mongoTaskModel.progress,
        open: mongoTaskModel.open,
        logs: mongoTaskModel.logs.map(mapLogs),
        linkedTasks: mongoTaskModel.linkedTasks
    };
};

class TasksController {
	
	get router() {
		return this._router;
	}
	
	constructor() {
		this.init();
	}
	
	init() {
		this._router = express.Router();
		this._router.get('/', this.getTasks.bind(this));
		this._router.get('/:taskCode', this.getTask.bind(this));
		this._router.post('/', this.createTask.bind(this));
		this._router.post('/:taskCode/log', this.logWork.bind(this));
        this._router.post('/:taskCode/close', this.closeTask.bind(this));
        this._router.post('/:taskCode/link', this.linkTask.bind(this));
	}

	getTasks(request, response) {

	    const taskCode = request.query.taskCode || '';
        const projectCode = request.query.projectCode || '';

	    winston.debug(' Finding tasks ');
	    winston.debug(` Filters - taskCode: ${taskCode} & projectCode: ${projectCode} `);

		Task.find({
                code: new RegExp(`.*${taskCode}.*`, 'i'),
                projectCode: new RegExp(`.*${projectCode}.*`, 'i')
            }, (error, result) => {
			if (error) {
				const errorBody = {
					code: 'TM-TASK-001',
					message: error
				};

				winston.error(JSON.stringify(errorBody));
				response.json(errorBody);
			} else {
				response.json(result.map(mapToModel));
			}
		});
	}

	getTask(request, response) {
		
		const taskCode = request.params.taskCode;

		winston.debug(` Finding task with code ${taskCode} `);

		const responseBody = {
		    error: undefined,
            task: undefined
        };
		
		Task.findOne({ code: taskCode }, (error, result) => {
			if (error) {
				const errorBody = {
					code: 'TM-TASK-002',
					message: error
				};

                winston.error(JSON.stringify(errorBody));
                responseBody.error = errorBody;
				response.json(responseBody);
			} else {
                responseBody.task = mapToModel(result);
                response.json(responseBody);
            }
		});
	}

	createTask(request, response) {

        const name = request.body.name;
		const description = request.body.description;
		const duration = request.body.duration;
		const projectCode = request.body.projectCode;

		// FIXME: Possible error if code hits a number > 5 digits?
		const basePattern = '00000';

        winston.debug(` Creating task ${name} `);

		const taskModel = {
			code: basePattern,
			name: name,
			description: description,
			duration: duration,
            projectCode: projectCode
		};

		Task.count({}, (error, count) => {
		    if (error) {
                const errorBody = {
                    code: 'TM-TASK-004',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
		        const taskCode = count + 1;
		        taskModel.code = basePattern.substring(String(taskCode).length) + taskCode;
                Task.create(taskModel, (error, task) => {
                    if (error) {
                        const errorBody = {
                            code: 'TM-TASK-003',
                            message: error
                        };

                        winston.error(JSON.stringify(errorBody));
                        response.json(errorBody);
                    } else {
                        const successBody = {
                            code: 'TM-TASK-000',
                            message: 'Task successfully created'
                        };

                        response.json(successBody);
                    }
                });
            }
        });
	}

	logWork(request, response) {
		
		const taskCode = request.params.taskCode;
		const loggedTime = request.body.time;
        const logDate = request.body.date;
        const logDetail = request.body.detail;

        const log = {
            date: logDate,
            description: logDetail,
            duration: loggedTime
        };

        winston.debug(` Logging ${loggedTime} for task ${taskCode} at ${logDate} `);
		
		Task.findOne({ code: taskCode }, (error, result) => {
			if (error) {
				const errorBody = {
					code: 'TM-TASK-002',
					message: error
				};

                winston.error(JSON.stringify(errorBody));
				response.json(errorBody);
			} else {
                result.progress += loggedTime;
                result.logs.push(log);
                result.save((error, task) => {
                    if (error) {
                        const errorBody = {
                            code: 'TM-TASK-002',
                            message: error
                        };

                        winston.error(JSON.stringify(errorBody));
                        response.json(errorBody);
                    } else {
                        const successBody = {
                            code: 'TM-TASK-000',
                            message: 'Log successfully registered'
                        };

                        response.json(successBody);
                    }
                });
            }
		});
	}

	closeTask(request, response) {

        const taskCode = request.params.taskCode;

        winston.debug(` Closing task ${taskCode} `);

        Task.findOne({ code: taskCode }, (error, result) => {
            if (error) {
                const errorBody = {
                    code: 'TM-TASK-002',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                result.open = false;
                result.save((error, task) => {
                    if (error) {
                        const errorBody = {
                            code: 'TM-TASK-002',
                            message: error
                        };

                        winston.error(JSON.stringify(errorBody));
                        response.json(errorBody);
                    } else {
                        const successBody = {
                            code: 'TM-TASK-000',
                            message: 'Task successfully closed'
                        };

                        response.json(successBody);
                    }
                });
            }
        });
	}

    linkTask(request, response) {

        const taskCode = request.params.taskCode;
        const linkedTaskCode = request.body.code;

        winston.debug(` Linking tasks: ${taskCode} ${linkedTaskCode} `);

        Task.findOne({ code: taskCode }, (error, result) => {
            if (error) {
                const errorBody = {
                    code: 'TM-TASK-002',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                Task.findOne({ code: linkedTaskCode }, (error, linkedResult) => {
                    if (error) {
                        const errorBody = {
                            code: 'TM-TASK-002',
                            message: error
                        };

                        winston.error(JSON.stringify(errorBody));
                        response.json(errorBody);
                    } else {
                        if (result.linkedTasks.find((code) => code === linkedTaskCode)
                            || linkedResult.linkedTasks.find((code) => code === taskCode)) {
                            const errorBody = {
                                code: 'TM-TASK-005',
                                message: `Tasks ${taskCode} and ${linkedTaskCode} are already linked`
                            };

                            winston.error(JSON.stringify(errorBody));
                            response.json(errorBody);
                        } else {
                            result.linkedTasks.push(linkedTaskCode);
                            linkedResult.linkedTasks.push(taskCode);

                            result.save();
                            linkedResult.save();

                            const successBody = {
                                code: 'TM-TASK-000',
                                message: 'Task successfully linked'
                            };

                            response.json(successBody);
                        }
                    }
                });
            }
        });
    }

}

module.exports = new TasksController();
