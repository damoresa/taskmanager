const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const Project = require('./../../models/project.model');
const projectsController = require('./../../controllers/projects.controller');

winston.level = 'debug';

describe('Projects controller', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('has a router', () => {
		const router = projectsController.router;
		expect(router).to.not.be.null;
	});
	
	it('finds projects', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			body: {}
		};
		const responseBody = [
			{
				'code': 'EXPROJECT',
				'name': 'Example project',
				'description': 'This is an example project'
			},
			{
				'code': 'AEXPROJECT',
				'name': 'Another example project',
				'description': 'This is another example project'
			}
		];
		const request = mockReq(requestBody);
		const response = mockRes();
		const findProjectsStub = sandbox.stub(Project, 'find').callsFake((cb) => {
			cb(undefined, responseBody);
		});
		
		// Invoke the API endpoint with the stubbed data
		projectsController.getProjects(request, response);
		
		// Validate invokations and content
		expect(findProjectsStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles project search errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Error while fetching projects';
		const requestBody = {
			body: {}
		};
		const responseBody = {
			code: 'TM-PROJECT-001',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findProjectsStub = sandbox.stub(Project, 'find').callsFake((cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		projectsController.getProjects(request, response);
		
		// Validate invokations and content
		expect(findProjectsStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('creates projects', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			body: {
				code: 'EPROJ',
				name: 'Example project',
				description: 'Example project'
			}
		};
		const responseBody = {
			code: 'TM-PROJECT-000',
			message: 'Project successfully created'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const createProjectStub = sandbox.stub(Project, 'create').callsFake((projectModel, cb) => {
			cb(undefined, projectModel);
		});
		
		// Invoke the API endpoint with the stubbed data
		projectsController.createProject(request, response);
		
		// Validate invokations and content
		expect(createProjectStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles creation errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Error while creating project';
		const requestBody = {
			body: {
				code: 'EPROJ',
				name: 'Example project',
				description: 'Example project'
			}
		};
		const responseBody = {
			code: 'TM-PROJECT-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const createProjectStub = sandbox.stub(Project, 'create').callsFake((projectModel, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		projectsController.createProject(request, response);
		
		// Validate invokations and content
		expect(createProjectStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
});