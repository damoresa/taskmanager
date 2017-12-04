const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const jwt = require('jwt-simple');

const User = require('./../../models/user.model');
const authController = require('./../../controllers/auth.controller');

winston.level = 'debug';

describe('Auth controller', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('has a router', () => {
		const router = authController.router;
		expect(router).to.not.be.null;
	});
	
	it('handles login', () => {
		
		// Stub request, response and method calls within the API endpoint
		const userModel = {
			username: 'firstuser',
			password: 'randompassword',
			comparePassword: () => {}
		};
		const token = 'TEST_TOKEN';
		const requestBody = {
			body: {
				username: 'firstuser',
				password: 'randompassword'
			}
		};
		const responseBody = {
			token: token
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneUserStub = sandbox.stub(User, 'findOne').callsFake((filter, cb) => {
			cb(undefined, userModel);
		});
		const passwordValidationStub = sandbox.stub(userModel, 'comparePassword').callsFake((password, cb) => {
			cb(undefined, true);
		});
		const jwtEncodeStub = sandbox.stub(jwt, 'encode').callsFake((userData, secret) => {
			return token;
		});
		
		// Invoke the API endpoint with the stubbed data
		authController.login(request, response);
		
		// Validate invokations and content
		expect(findOneUserStub).to.have.been.calledOnce;
		expect(passwordValidationStub).to.have.been.calledOnce;
		expect(jwtEncodeStub).to.have.been.calledOnce;
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles find user error', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Error while retrieving user';
		const userModel = {
			username: 'firstuser',
			password: 'randompassword',
			comparePassword: () => {}
		};
		const requestBody = {
			body: {
				username: 'firstuser',
				password: 'randompassword'
			}
		};
		const responseBody = {
			code: 'TM-AUTH-001',
			message: errorMessage
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneUserStub = sandbox.stub(User, 'findOne').callsFake((filter, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		authController.login(request, response);
		
		// Validate invokations and content
		expect(findOneUserStub).to.have.been.calledOnce;
		expect(response.status).to.be.calledWith(401);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles user not found error', () => {
		
		// Stub request, response and method calls within the API endpoint
		const userModel = undefined;
		const requestBody = {
			body: {
				username: 'firstuser',
				password: 'randompassword'
			}
		};
		const responseBody = {
			error: 'Invalid user or password.'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneUserStub = sandbox.stub(User, 'findOne').callsFake((filter, cb) => {
			cb(undefined, userModel);
		});
		
		// Invoke the API endpoint with the stubbed data
		authController.login(request, response);
		
		// Validate invokations and content
		expect(findOneUserStub).to.have.been.calledOnce;
		expect(response.status).to.be.calledWith(401);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles password comparison error', () => {
		
		// Stub request, response and method calls within the API endpoint
		const errorMessage = 'Unable to compare passwords';
		const userModel = {
			username: 'firstuser',
			password: 'randompassword',
			comparePassword: () => {}
		};
		const token = 'TEST_TOKEN';
		const requestBody = {
			body: {
				username: 'firstuser',
				password: 'randompassword'
			}
		};
		const responseBody = {
			error: 'Invalid user or password.'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneUserStub = sandbox.stub(User, 'findOne').callsFake((filter, cb) => {
			cb(undefined, userModel);
		});
		const passwordValidationStub = sandbox.stub(userModel, 'comparePassword').callsFake((password, cb) => {
			cb(errorMessage, false);
		});
		
		// Invoke the API endpoint with the stubbed data
		authController.login(request, response);
		
		// Validate invokations and content
		expect(findOneUserStub).to.have.been.calledOnce;
		expect(passwordValidationStub).to.have.been.calledOnce;
		expect(response.status).to.be.calledWith(401);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
	it('handles password not matching', () => {
		
		// Stub request, response and method calls within the API endpoint
		const userModel = {
			username: 'firstuser',
			password: 'randompassword',
			comparePassword: () => {}
		};
		const token = 'TEST_TOKEN';
		const requestBody = {
			body: {
				username: 'firstuser',
				password: 'randompassword'
			}
		};
		const responseBody = {
			error: 'Invalid user or password.'
		};
		const request = mockReq(requestBody);
		const response = mockRes();
		const findOneUserStub = sandbox.stub(User, 'findOne').callsFake((filter, cb) => {
			cb(undefined, userModel);
		});
		const passwordValidationStub = sandbox.stub(userModel, 'comparePassword').callsFake((password, cb) => {
			cb(undefined, false);
		});
		
		// Invoke the API endpoint with the stubbed data
		authController.login(request, response);
		
		// Validate invokations and content
		expect(findOneUserStub).to.have.been.calledOnce;
		expect(passwordValidationStub).to.have.been.calledOnce;
		expect(response.status).to.be.calledWith(401);
		expect(response.json).to.be.calledWith(responseBody);
	});
	
});