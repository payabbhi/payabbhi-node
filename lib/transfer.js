'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');
const Payment = require('./payment');

class Transfer extends Resource{
  constructor(config) {
    super(config);
  }

  create(sourceId, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST',  Helpers.nurl(new Payment, sourceId, 'transfers'), p.params, p.cb)
  }

  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

}

module.exports = Transfer;
