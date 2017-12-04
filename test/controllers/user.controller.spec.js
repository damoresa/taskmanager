const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const User = require('./../../models/user.model');
const userController = require('./../../controllers/users.controller');

winston.level = 'debug';

describe('Users controller', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('has a router', () => {
		const router = userController.router;
		expect(router).to.not.be.null;
	});
	
	it('finds users', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			body: {}
		};
		const responseBody = [
			{
				'username': 'firstuser',
				'email': 'firstuser@firstuser.com'
			},
			{
				'username': 'seconduser',
				'email': 'seconduser@seconduser.com'
			}
		];
		const request = mockReq(requestBody);
		const response = mockRes();
		const findUsersStub = sandbox.stub(User, 'find').callsFake((cb) => {
			cb(undefined, responseBody);
		});
		
		// Invoke the API endpoint with the stubbed data
		userController.getUsers(request, response);
		
		// Validate invokations and content
		expect(findUsersStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles search errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Example error';
		const requestBody = {
			body: {}
		};
		const responseBody = {
			code: 'TM-USERS-001',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findUsersStub = sandbox.stub(User, 'find').callsFake((cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		userController.getUsers(request, response);
		
		// Validate invokations and content
		expect(findUsersStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('creates users', () => {
		
		// Stub request, response and method calls within the API endpoint
		const requestBody = {
			body: {
				username: 'newuser',
				password: 'newuser',
				email: 'newuser@newuser.com'
			}
		};
		const responseBody = {
			code: 'TM-USERS-000',
			message: 'User successfully created'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const createUserStub = sandbox.stub(User, 'create').callsFake((userData, cb) => {
			cb(undefined, userData);
		});
		
		// Invoke the API endpoint with the stubbed data
		userController.createUser(request, response);
		
		// Validate invokations and content
		expect(createUserStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles creation errors', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage= 'User already exists';
		const requestBody = {
			body: {
				username: 'newuser',
				password: 'newuser',
				email: 'newuser@newuser.com'
			}
		};
		const responseBody = {
			code: 'TM-USERS-002',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const createUserStub = sandbox.stub(User, 'create').callsFake((userData, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		userController.createUser(request, response);
		
		// Validate invokations and content
		expect(createUserStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
});