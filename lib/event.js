'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Event extends Resource{
  constructor(config) {
    super(config);
  }

  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

}

module.exports = Event;
