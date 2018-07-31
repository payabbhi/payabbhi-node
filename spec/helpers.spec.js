const assert = require('chai').assert;
const expect = require('chai').expect;
const Helpers = require('../lib/helpers');

const apiErrorJSON = require('./data/errors/api.json');
const gatewayErrorJSON = require('./data/errors/gateway.json');
const authenticationErrorJSON = require('./data/errors/authentication.json');
const invalidRequestErrorJSON = require('./data/errors/request.json');
const unspecifiedErrorJSON = require('./data/errors/unspecified.json');

describe('Helpers', function() {

  describe('#pluralized()',function () {

    it('should return pluralized class name', function () {
      class Planet{};

      var result = Helpers.pluralized(new Planet());
      assert.equal(result, 'planets');
    });


    it('should return empty string for null class name', function () {
      var result = Helpers.pluralized(null);
      assert.isEmpty(result);
    });


    it('should return empty string class name parameter is not passed', function () {
      var result = Helpers.pluralized();
      assert.isEmpty(result);
    });



  });


  describe('#sanitize()',function () {
    it('should return object and function if called with object and function', function () {
      var result = Helpers.sanitize({count:2}, (e,r) => { });
      assert.isObject(result.params);
      assert.isFunction(result.cb);
    });

    it('should return null and function if called with null and function', function () {
      var result = Helpers.sanitize(null, (e,r) => { });
      assert.isNull(result.params);
      assert.isFunction(result.cb);
    });

    it('should return null and function if called with function only', function () {
      var result = Helpers.sanitize((e,r) => { });
      assert.isNull(result.params);
      assert.isFunction(result.cb);
    });

    it('should return object and null if called with object only', function () {
      var result = Helpers.sanitize({ count: 2 });
      assert.isObject(result.params);
      assert.isNull(result.cb);
    });

    it('should return null and null if called without arguments', function () {
      var result = Helpers.sanitize();
      assert.isNull(result.params);
      assert.isNull(result.cb);
    });

    it('should throw error if called two objects', function () {
      expect(function () {
        var result = Helpers.sanitize({count:2}, {skip:10});
      }).to.throw();
    });

  });


  describe('#extractError', function () {
      it('should return invalid request error', function () {
        var e = Helpers.extractError(400, invalidRequestErrorJSON.error);
        assert.equal(e.constructor.name, 'InvalidRequestError');
        assert.equal(e.status, 400);
        assert.equal(e.field, 'currency');
        assert.equal(e.emessage, 'Unsupported Currency Code');
      });

      it('should return authentication error', function () {
        var e = Helpers.extractError(401, authenticationErrorJSON.error);
        assert.equal(e.constructor.name, 'AuthenticationError');
        assert.equal(e.status, 401);
        assert.equal(e.emessage, 'Access ID or Secret Key is invalid');
      });

      it('should return gateway error', function () {
        var e = Helpers.extractError(501, gatewayErrorJSON.error);
        assert.equal(e.constructor.name, 'GatewayError');
        assert.equal(e.status, 501);
        assert.equal(e.emessage, 'The gateway request timed out');
      });

      it('should return api error', function () {
        var e = Helpers.extractError(500, apiErrorJSON.error);
        assert.equal(e.constructor.name, 'ApiError');
        assert.equal(e.status, 500);
        assert.equal(e.emessage, 'Server Unavailable');

      });

      it('should return api error if type is unspecified', function () {
        var e = Helpers.extractError(500, unspecifiedErrorJSON.error);
        assert.equal(e.constructor.name, 'ApiError');
        assert.equal(e.status, 500);
      });

  });

});
