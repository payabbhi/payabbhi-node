'use strict'

const Order   = require('./order');
const Payment = require('./payment');
const Refund  = require('./refund');
const Config  = require('./config');
const Signature  = require('./signature');

const DEFAULT_BASE_URL = 'https://payabbhi.com/api/v1';
const DEFAULT_TIMEOUT = require('http').createServer().timeout;
const PACKAGE_VERSION = require('../package.json').version;

class Payabbhi {
	constructor(accessId, secretKey) {
		this.accessId  = accessId;
		this.secretKey = secretKey;

		this.config = new Config()
		  .setbaseUrl(DEFAULT_BASE_URL)
		  .setTimeout(DEFAULT_TIMEOUT)
			.setVersion(PACKAGE_VERSION)
		  .setAccessId(this.accessId)
		  .setSecretKey(this.secretKey);

		this.orders   = new Order(this.config);
		this.payments = new Payment(this.config);
		this.refunds  = new Refund(this.config);
	}

	setTimeout(value) {
		this.config.setTimeout(value);
	}

	setAppInfo(name, version, url) {
		this.config.setAppInfo(name, version, url);
	}

	verifyPaymentSignature(data) {
		return Signature.paymentSignatureVerify(data, this.secretKey);
	}

	verifyWebhookSignature(data, actualSignature, secret, replayInterval=300) {
		return Signature.webhookSignatureVerify(data, actualSignature, secret, replayInterval);
	}
}

module.exports = function(accessId, secretKey) {
	if (!(this instanceof Payabbhi)) {
	    return new Payabbhi(accessId, secretKey);
	}
};
