const assert = require('chai').assert;
const nock = require('nock');
const Config = require('../lib/config');
const Fetcher = require('../lib/fetcher');
const authenticationErrorJSON = require('./data/errors/authentication.json');

describe('Fetcher', function() {
  var config = new Config()
      .setbaseUrl('http://api.me/api/v1')
      .setTimeout(1000)
      .setVersion('1.0.0')
      .setAccessId('access-id')
      .setSecretKey('secret-key');


  beforeEach(() => {
    nock('http://api.me/api/v1')
      .get('/cats')
      .reply(401, authenticationErrorJSON);
  });


  it('should respond with proper errors', function(done) {

    new Fetcher(config).fetch("GET", "/cats", {}, null).catch(function (error) {
      assert.equal(error.constructor.name, 'AuthenticationError');
      done();
    });
  });

	it('should call callback with error', function(done){

    new Fetcher(config).fetch("GET", "/cats", {}, function(error, response){
      assert.equal(error.constructor.name, 'AuthenticationError');
      done();
    });
	});

});
