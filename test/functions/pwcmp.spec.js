const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const winston = require('winston');

chai.use(sinonChai);
const expect = chai.expect;

const bcrypt = require('bcrypt');

const passwordcomp = require('./../../models/user.model.pwcmp');

winston.level = 'debug';

describe('Password comparison function', function () {
	var sandbox;
	
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});
	
	afterEach(function () {
		sandbox.restore();
	});
	
	it('compares passwords: success', () => {
		// Generate stubs
		const result = true;
		const callback = sinon.spy();
		const bcryptCompareStub = sandbox.stub(bcrypt, 'compare').callsFake((plainPw, hashedPw, cb) => {
			cb(undefined, result);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordcomp('password', callback);
		
		// Validate invokations and content
		expect(bcryptCompareStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
		expect(callback).to.have.been.calledWith(null, result);
	});
	
	it('compares passwords: error', () => {
		// Generate stubs
		const result = false;
		const callback = sinon.spy();
		const bcryptCompareStub = sandbox.stub(bcrypt, 'compare').callsFake((plainPw, hashedPw, cb) => {
			cb(undefined, result);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordcomp('password', callback);
		
		// Validate invokations and content
		expect(bcryptCompareStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
		expect(callback).to.have.been.calledWith(null, result);
	});
	
	it('handles comparison error', () => {
		// Generate stubs
		const errorMessage = 'Comparison error';
		const callback = sinon.spy();
		const bcryptCompareStub = sandbox.stub(bcrypt, 'compare').callsFake((plainPw, hashedPw, cb) => {
			cb(errorMessage);
		});
		
		// Invoke the API endpoint with the stubbed data
		passwordcomp('password', callback);
		
		// Validate invokations and content
		expect(bcryptCompareStub).to.have.been.calledOnce;
		expect(callback).to.have.been.calledOnce;
		expect(callback).to.have.been.calledWith(errorMessage);
	});
});