'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Payment extends Resource{
  constructor(config) {
    super(config);
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

  retrieve(id, cb) {
    return super.request('GET', Helpers.url(this, id), {}, cb);
  }

  capture(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST', Helpers.nurl(this, id, 'capture'), p.params, p.cb);
  }

  refunds(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.nurl(this, id, 'refunds', p.params), {}, p.cb);
  }

  transfers(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.nurl(this, id, 'transfers', p.params), p.cb);
  }
}

module.exports = Payment;
