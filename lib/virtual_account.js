'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');
const Payment = require('./payment');

class Virtual_Account extends Resource{
  constructor(config){
    super(config);
  }
  create(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST',  Helpers.url(this), p.params, p.cb)
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

  payments(id, cb) {
    return super.request('GET',  Helpers.nurl(this, id, 'payments'), {}, cb)
  }

  close(id, cb) {
    return super.request('PATCH', Helpers.url(this, id), {}, cb)
  }

  details(id, cb) {
    return super.request('GET', Helpers.nurl(new Payment,id,'virtual_account'),{},cb);
  }

}
module.exports = Virtual_Account;
