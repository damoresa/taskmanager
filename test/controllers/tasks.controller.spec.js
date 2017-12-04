const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const Log = require('./../../models/log.model');
const Task = require('./../../models/task.model');
const tasksController = require('./../../controllers/tasks.controller');

winston.level = 'debug';

describe('Tasks controller', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('has a router', () => {
		const router = tasksController.router;
		expect(router).to.not.be.null;
	});
	
	it('finds tasks', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			query: {
				taskCode: 'EX001',
				projectCode: 'EXAMPLE'
			},
			body: {}
		};
		const responseBody = [
			{
				'code': 'EX001',
				'name': 'EXAMPLE TASK',
				'description': 'This is an example task',
				'duration': 60,
				'progress': 30,
				'open': true,
				'logs': [
					{
						'date': '01/01/1970',
						'log': 'Example log',
						'duration': 30
					}
				],
				'linkedTasks': ['1', '2']
			}
		];
		// MongoDB datamodel names do not match the response objects
		const mongoDBResponse = [
			{
				'code': 'EX001',
				'name': 'EXAMPLE TASK',
				'description': 'This is an example task',
				'duration': 60,
				'progress': 30,
				'open': true,
				'logs': [
					{
						'date': '01/01/1970',
						'description': 'Example log',
						'duration': 30
					}
				],
				'linkedTasks': ['1', '2']
			}
		];
		const request = mockReq(requestBody);
		const response = mockRes();
		const findTasksStub = sandbox.stub(Task, 'find').callsFake((filters, cb) => {
			cb(undefined, mongoDBResponse);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.getTasks(request, response);
		
		// Validate invokations and content
		expect(findTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles tasks search errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Example error';
		const requestBody = {
			body: {}
		};
		const responseBody = {
			code: 'TM-TASK-001',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findTasksStub = sandbox.stub(Task, 'find').callsFake(({}, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.getTasks(request, response);
		
		// Validate invokations and content
		expect(findTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('finds single task', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {}
		};
		const responseBody = {
			error: undefined,
			task: {
				'code': 'EX001',
				'name': 'EXAMPLE TASK',
				'description': 'This is an example task',
				'duration': 60,
				'progress': 30,
				'open': true,
				'logs': [
					{
						'date': '01/01/1970',
						'log': 'Example log',
						'duration': 30
					}
				],
				'linkedTasks': ['1', '2']
			}
		};
		// MongoDB datamodel names do not match the response objects
		const mongoDBResponse = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': ['1', '2']
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findTasksStub = sandbox.stub(Task, 'findOne').callsFake((filters, cb) => {
			cb(undefined, mongoDBResponse);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.getTask(request, response);
		
		// Validate invokations and content
		expect(findTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles error when searching single task', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Task not found';
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {}
		};
		const responseBody = {
			error: {
				code: 'TM-TASK-002',
				message: errorMessage
			},
			task: undefined
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findTasksStub = sandbox.stub(Task, 'findOne').callsFake((filters, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.getTask(request, response);
		
		// Validate invokations and content
		expect(findTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('creates tasks', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			query: {},
			body: {
				name: 'EXAMPLE TASK',
				description: 'This is an example task',
				duration: 60,
				projectCode: 'EXPROJECT'
			}
		};
		const responseBody = {
			code: 'TM-TASK-000',
			message: 'Task successfully created'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const countTasksStub = sandbox.stub(Task, 'count').callsFake((filter, cb) => {
			cb(undefined, 0);
		});
		const createTasksStub = sandbox.stub(Task, 'create').callsFake((taskModel, cb) => {
			expect(taskModel.code).to.equal('00001');
			cb(undefined, taskModel);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.createTask(request, response);
		
		// Validate invokations and content
		expect(countTasksStub).to.have.been.calledOnce;
		expect(createTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles creation count errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Count error';
		const requestBody = {
			query: {},
			body: {
				name: 'EXAMPLE TASK',
				description: 'This is an example task',
				duration: 60,
				projectCode: 'EXPROJECT'
			}
		};
		const responseBody = {
			code: 'TM-TASK-004',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const countTasksStub = sandbox.stub(Task, 'count').callsFake((filter, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.createTask(request, response);
		
		// Validate invokations and content
		expect(countTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('creates creation errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Unable to create task';
		const requestBody = {
			query: {},
			body: {
				name: 'EXAMPLE TASK',
				description: 'This is an example task',
				duration: 60,
				projectCode: 'EXPROJECT'
			}
		};
		const responseBody = {
			code: 'TM-TASK-003',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const countTasksStub = sandbox.stub(Task, 'count').callsFake((filter, cb) => {
			cb(undefined, 0);
		});
		const createTasksStub = sandbox.stub(Task, 'create').callsFake((taskModel, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.createTask(request, response);
		
		// Validate invokations and content
		expect(countTasksStub).to.have.been.calledOnce;
		expect(createTasksStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('logs work', () => {
		
		// Stub request, response and method calls within the API endpoint
		const exampleTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': ['1', '2'],
			'save': () => {}
		};
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				time: 30,
				date: '01/01/1970',
				detail: 'Example log'
			}
		};
		const responseBody = {
			code: 'TM-TASK-000',
			message: 'Log successfully registered'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, exampleTask);
		});
		const saveTaskStub = sandbox.stub(exampleTask, 'save').callsFake((cb) => {
			cb(undefined, exampleTask);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.logWork(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(saveTaskStub).to.have.been.calledOnce;
		expect(exampleTask.progress).to.equal(30);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles not found tasks when logging', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Task not found';
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				time: 30,
				date: '01/01/1970',
				detail: 'Example log'
			}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.logWork(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles saving errors when logging', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Error when saving task';
		const exampleTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': ['1', '2'],
			'save': () => {}
		};
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				time: 30,
				date: '01/01/1970',
				detail: 'Example log'
			}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, exampleTask);
		});
		const saveTaskStub = sandbox.stub(exampleTask, 'save').callsFake((cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.logWork(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(saveTaskStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('closes tasks', () => {
		
		// Stub request, response and method calls within the API endpoint
		const taskModel = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': ['1', '2'],
			'save': () => {}
		};
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {}
		};
		const responseBody = {
			code: 'TM-TASK-000',
			message: 'Task successfully closed'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, taskModel);
		});
		const saveTaskStub = sandbox.stub(taskModel, 'save').callsFake((cb) => {
			cb(undefined, taskModel);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.closeTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(saveTaskStub).to.have.been.calledOnce;
		expect(taskModel.open).to.equal(false);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles not found tasks when closing', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Unable to find task';
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.closeTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles saving errors when closing', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Unable to save task';
		const taskModel = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': ['1', '2'],
			'save': () => {}
		};
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, taskModel);
		});
		const saveTaskStub = sandbox.stub(taskModel, 'save').callsFake((cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.closeTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(saveTaskStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('links tasks', () => {
		
		// Stub request, response and method calls within the API endpoint
		const originalTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': [],
			'save': () => {}
		};
		const linkedTask = {
			'code': 'EX002',
			'name': 'ANOTHER EXAMPLE TASK',
			'description': 'This is another example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': [],
			'save': () => {}
		};
		const tasks = [originalTask, linkedTask];
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				code: 'EX002'
			}
		};
		const responseBody = {
			code: 'TM-TASK-000',
			message: 'Task successfully linked'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, tasks.find((task) => task.code === filter.code));
		});
		const saveOriginalTaskStub = sandbox.stub(originalTask, 'save').callsFake(() => {});
		const saveLinkedTaskStub = sandbox.stub(linkedTask, 'save').callsFake(() => {});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.linkTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledTwice;
		expect(saveOriginalTaskStub).to.have.been.calledOnce;
		expect(saveLinkedTaskStub).to.have.been.calledOnce;
		// We cannot validate that ['EX001'] === ['EX001'] because those are different objects
		expect(originalTask.linkedTasks.length).to.equal(1);
		expect(originalTask.linkedTasks[0]).to.equal('EX002');
		expect(linkedTask.linkedTasks.length).to.equal(1);
		expect(linkedTask.linkedTasks[0]).to.equal('EX001');
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles already linked tasks', () => {
		
		// Stub request, response and method calls within the API endpoint
		const originalTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': ['EX002'],
			'save': () => {}
		};
		const linkedTask = {
			'code': 'EX002',
			'name': 'ANOTHER EXAMPLE TASK',
			'description': 'This is another example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': ['EX001'],
			'save': () => {}
		};
		const tasks = [originalTask, linkedTask];
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				code: 'EX002'
			}
		};
		const responseBody = {
			code: 'TM-TASK-005',
			message: 'Tasks EX001 and EX002 are already linked'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, tasks.find((task) => task.code === filter.code));
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.linkTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledTwice;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles already linked tasks with inconsistent data', () => {
		
		// Stub request, response and method calls within the API endpoint
		const originalTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': [],
			'save': () => {}
		};
		const linkedTask = {
			'code': 'EX002',
			'name': 'ANOTHER EXAMPLE TASK',
			'description': 'This is another example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': ['EX001'],
			'save': () => {}
		};
		const tasks = [originalTask, linkedTask];
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				code: 'EX002'
			}
		};
		const responseBody = {
			code: 'TM-TASK-005',
			message: 'Tasks EX001 and EX002 are already linked'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			cb(undefined, tasks.find((task) => task.code === filter.code));
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.linkTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledTwice;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles original linked task not found', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Task not found';
		const linkedTask = {
			'code': 'EX002',
			'name': 'ANOTHER EXAMPLE TASK',
			'description': 'This is another example task',
			'duration': 60,
			'progress': 0,
			'open': true,
			'logs': [],
			'linkedTasks': [],
			'save': () => {}
		};
		const tasks = [linkedTask];
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				code: 'EX002'
			}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			const task = tasks.find((task) => task.code === filter.code);
			if (task) {
				cb(undefined, task);
			} else {
				cb(errorMessage);
			}
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.linkTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles linked task to original not found', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Task not found';
		const originalTask = {
			'code': 'EX001',
			'name': 'EXAMPLE TASK',
			'description': 'This is an example task',
			'duration': 60,
			'progress': 30,
			'open': true,
			'logs': [
				{
					'date': '01/01/1970',
					'description': 'Example log',
					'duration': 30
				}
			],
			'linkedTasks': [],
			'save': () => {}
		};
		const tasks = [originalTask];
		const requestBody = {
			params: {
				taskCode: 'EX001'
			},
			query: {},
			body: {
				code: 'EX002'
			}
		};
		const responseBody = {
			code: 'TM-TASK-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneTaskStub = sandbox.stub(Task, 'findOne').callsFake((filter, cb) => {
			const task = tasks.find((task) => task.code === filter.code);
			if (task) {
				cb(undefined, task);
			} else {
				cb(errorMessage);
			}
		});
		
		// Invoke the API endpoint with the stubbed data
		tasksController.linkTask(request, response);
		
		// Validate invokations and content
		expect(findOneTaskStub).to.have.been.calledTwice;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
});