var should    = require('chai').should();
var sinon     = require('sinon');
var Fraudster = require('fraudster');
var sandbox   = sinon.sandbox.create();

describe('Internal Error Middleware', function() {

  beforeEach(function() {
    var fraudster   = new Fraudster({
        warnOnUnregistered  : false,
        errorOnUnregistered : false,
        warnOnReplace       : false,
        errorOnReplace      : false
    });
    var fakeLogger  = function () {
      return { error: function () {} };
    };

    fraudster.registerMock('logger-initializer', fakeLogger);
    fraudster.enable();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('returns a 500 message when', function() {

    it('its called with an error object', function () {
      var internalErrorMW  = require('../index');
      var error = new Error('Could not parse JSON');

      var expectedResponse = {
        status  : 'Internal Server Error',
        message : error.message,
        error   : error
      };
      var res = {
        status: sandbox.stub(),
        json  : sandbox.stub()
      };
      internalErrorMW(error, null, res, null);
      res.status.calledWith(500).should.be.true;
      res.json.calledWith(expectedResponse).should.be.true;
    });

    // @TODO More tests

  });
});