'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Invoiceitem extends Resource{
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

  delete(id, cb) {
    return super.request('DELETE',  Helpers.url(this, id), {}, cb);
  }

  invoices(id, cb) {
    return super.request('GET', Helpers.nurl(this, id, 'invoices'), {}, cb);
  }
}

module.exports = Invoiceitem;
