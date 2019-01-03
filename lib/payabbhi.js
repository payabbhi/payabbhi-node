'use strict'

const Order        = require('./order');
const Payment      = require('./payment');
const Refund       = require('./refund');
const Config       = require('./config');
const Signature    = require('./signature');
const Product      = require('./product');
const Plan         = require('./plan');
const Customer     = require('./customer');
const Subscription = require('./subscription');
const Invoice      = require('./invoice');
const Invoiceitem  = require('./invoiceitem');
const Event        = require('./event');
const Transfer     = require('./transfer');

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

    this.orders        = new Order(this.config);
    this.payments      = new Payment(this.config);
    this.refunds       = new Refund(this.config);
    this.products      = new Product(this.config);
    this.plans         = new Plan(this.config);
    this.customers     = new Customer(this.config);
    this.subscriptions = new Subscription(this.config);
    this.invoices      = new Invoice(this.config);
    this.invoiceitems  = new Invoiceitem(this.config);
    this.events        = new Event(this.config);
    this.transfers     = new Transfer(this.config);
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
