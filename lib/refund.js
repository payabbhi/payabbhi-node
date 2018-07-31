'use strict'

const Resource = require('./resource');
const Payment = require('./payment');
const Helpers = require('./helpers');

class Refund extends Resource{
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

	create(paymentId, params, cb) {
		var p = Helpers.sanitize(params, cb);
		return super.request('POST', Helpers.nurl(new Payment, paymentId, 'refunds'), p.params, p.cb);
	}

}

module.exports = Refund;
