const assert = require('chai').assert;
const Config = require('../lib/config');

describe('Config', function() {

  it('should set config properties', function() {
    var config = new Config()
        .setbaseUrl('http://api.me/api/v1')
        .setTimeout(1000)
        .setVersion('1.0.0')
        .setAccessId('access-id')
        .setSecretKey('secret-key');

    assert.equal(config.baseURL, 'http://api.me/api/v1');
    assert.equal(config.timeout, 1000);
    assert.equal(config.version, '1.0.0');
    assert.equal(config.accessId, 'access-id');
    assert.equal(config.secretKey, 'secret-key');
  });

  it('should set appinfo', function(){
    var config = new Config().setAppInfo('MyApp', '2.0.1', 'https://myapp.me');

    assert.equal(config.appInfo.toString(), 'MyApp/2.0.1 (https://myapp.me)');
  });

});
