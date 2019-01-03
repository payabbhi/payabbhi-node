'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Invoice extends Resource{
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

  cancel(id, cb) {
    return super.request('POST', Helpers.nurl(this, id, 'cancel'), {}, cb);
  }

  line_items(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.nurl(this, id, 'line_items', p.params), p.cb);
  }

  payments(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.nurl(this, id, 'payments', p.params), p.cb);
  }

}

module.exports = Invoice;
