const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const bcrypt = require('bcrypt');

const passwordsalt = require('./../../models/user.model.pwsalt');

winston.level = 'debug';

describe('Password salt function', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('salts password', () => {
		// Generate stubs
		const salt = '1234$';
		const hash = '$4321';
		const callback = sinon.spy();
		const bcryptSaltStub = sandbox.stub(bcrypt, 'genSalt').callsFake((size, cb) => {
			cb(undefined, salt);
		});
		const bcryptHashStub = sandbox.stub(bcrypt, 'hash').callsFake((planPw, salt, cb) => {
			cb(undefined, hash);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordsalt(callback);
		
		// Validate invokations and content
		expect(bcryptSaltStub).to.have.been.calledOnce;
		expect(bcryptHashStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
	});
	
	it('handles salt generation error', () => {
		// Generate stubs
		const saltGenerationError = 'Unable to generate salt';
		const callback = sinon.spy();
		const bcryptSaltStub = sandbox.stub(bcrypt, 'genSalt').callsFake((size, cb) => {
			cb(saltGenerationError);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordsalt(callback);
		
		// Validate invokations and content
		expect(bcryptSaltStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
	});
	
	it('handles hash generation error', () => {
		// Generate stubs
		const hashGenerationError = 'Unable to hash password';
		const salt = '1234$';
		const callback = sinon.spy();
		const bcryptSaltStub = sandbox.stub(bcrypt, 'genSalt').callsFake((size, cb) => {
			cb(undefined, salt);
		});
		const bcryptHashStub = sandbox.stub(bcrypt, 'hash').callsFake((planPw, salt, cb) => {
			cb(hashGenerationError);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordsalt(callback);
		
		// Validate invokations and content
		expect(bcryptSaltStub).to.have.been.calledOnce;
		expect(bcryptHashStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
	});
	
});