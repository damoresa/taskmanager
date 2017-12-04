const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const Project = require('./../../models/project.model');
const combosController = require('./../../controllers/combos.controller');

winston.level = 'debug';

describe('Combos controller', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('has a router', () => {
		const router = combosController.router;
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
				'description': 'Example project'
			},
			{
				'code': 'AEXPROJECT',
				'description': 'Another example project'
			}
		];
		// MongoDB datamodel names do not match the response objects
		const mongoDBResponse = [
			{
				'code': 'EXPROJECT',
				'name': 'Example project'
			},
			{
				'code': 'AEXPROJECT',
				'name': 'Another example project'
			}
		];
		const request = mockReq(requestBody);
		const response = mockRes();
		const findProjectsStub = sandbox.stub(Project, 'find').callsFake((cb) => {
			cb(undefined, mongoDBResponse);
		});
		
		// Invoke the API endpoint with the stubbed data
		combosController.getProjects(request, response);
		
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
			code: 'TM-COMBO-001',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findProjectsStub = sandbox.stub(Project, 'find').callsFake((cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		combosController.getProjects(request, response);
		
		// Validate invokations and content
		expect(findProjectsStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
});