const assert = require('chai').assert;
const expect = require('chai').expect

const payabbhi = require('../lib/payabbhi')('access_id', 'secret_key');


describe('Payabbhi', function() {
  describe('#verifyPaymentSignature()', function() {

    it('should verify payment signature', function() {

      var result = payabbhi.verifyPaymentSignature({
        "order_id": "dummy_order_id",
        "payment_id": "dummy_payment_id",
        "payment_signature": "e70360e32919311d31cbc9b558ea9024715b816ce64293ffc992459a94daac42"
      });

      assert.isTrue(result);
    });


    it('should throw error for invalid data', function () {
      expect(function () {
        payabbhi.verifyPaymentSignature({
          "order_id": "dummy_order_id",
          "payment_id": "dummy_payment_id",
          "payment_signature": null
        });
      }).to.throw()
    });

  });

  describe('#setTimeout', function () {

    it('should set timeout value', function () {
      payabbhi.setTimeout(5000);
      assert.equal(payabbhi.config.timeout, 5000);
    });

  });

  describe('#setAppInfo', function () {
    it('should set app info', function () {
      payabbhi.setAppInfo('My Plugin', '10.0.1', 'http://myplugin.me');
      assert.equal(payabbhi.config.appInfo.toString(), 'My Plugin/10.0.1 (http://myplugin.me)');
    });
  });

});
