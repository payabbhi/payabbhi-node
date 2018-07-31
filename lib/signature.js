'use strict'
const _ = require('lodash');
const crypto = require('crypto');
const errors = require('./errors');

class Signature {

  static verify(data, secretKey) {
    if (_.isNil(data)) {
      throw new errors.PayabbhiError('failed to varify signature - invalid arguments');
    }

    var computedSignature = this.computeSignature(data.payment_id + '&' + data.order_id, secretKey)
    return this.secureCompare(data.payment_signature, computedSignature)
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
