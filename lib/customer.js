'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Customer extends Resource{
  constructor(config) {
    super(config);
  }

  create(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST',  Helpers.url(this), p.params, p.cb)
  }

  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

  edit(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('PUT', Helpers.url(this, id), p.params, p.cb)
  }

}

module.exports = Customer;
