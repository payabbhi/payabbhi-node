'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Settlement extends Resource{
  constructor(config){
    super(config);
  }

  all(params,cb){
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }
  retrieve(id,cb){
    return super.request('GET',Helpers.url(this,id),{},cb);
  }

}
module.exports = Settlement;
