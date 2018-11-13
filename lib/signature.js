'use strict'
const _ = require('lodash');
const util = require('util');
const crypto = require('crypto');
const errors = require('./errors');

class Signature {

  static paymentSignatureVerify(data, secretKey) {
    if (_.isNil(data)) {
      throw new errors.PayabbhiError('failed to verify signature - invalid arguments');
    }

    var computedSignature = this.computeSignature(data.payment_id + '&' + data.order_id, secretKey)
    return this.secureCompare(data.payment_signature, computedSignature)
  }

  static webhookSignatureVerify(data, actualSignature, secret, replayInterval) {
    if (_.isNil(data)) {
      throw new errors.PayabbhiError('failed to verify signature - invalid arguments');
    }
    if (_.isNil(actualSignature)) {
      throw new errors.PayabbhiError('failed to verify signature - invalid signature');
    }
    if (_.isNil(secret)) {
      throw new errors.PayabbhiError('failed to verify signature - invalid secret');
    }

    var entities = actualSignature.split(",")
    var payloadMap = {}
    for (var i = 0 ; i < entities.length ; i ++) {
      var keyValue = entities[i].split("=")
      payloadMap[keyValue[0].trim()] = keyValue[1]
    }

    if (!("t" in payloadMap) || !("v1" in payloadMap) || Math.round(Date.now()/1000) - parseInt(payloadMap["t"]) > replayInterval) {
      return false
    }

    var canonicalString  = util.format('%s&%s', data,payloadMap["t"])
    var computedSignature = this.computeSignature(canonicalString, secret)
    return this.secureCompare(payloadMap["v1"], computedSignature)

  }


  static computeSignature(payload, secretKey) {
    if (_.isNil(payload)) {
      throw new errors.PayabbhiError('failed to compute signature - invalid data');
    }

    if (_.isNil(secretKey)) {
      throw new errors.PayabbhiError('failed to compute signature - invalid key');
    }

    return crypto.createHmac('sha256', secretKey)
      .update(payload, 'utf8')
      .digest('hex');
  }

  static secureCompare(a, b) {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }

}

module.exports = Signature
