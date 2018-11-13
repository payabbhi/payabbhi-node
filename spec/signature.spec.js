const assert = require('chai').assert;
const expect = require('chai').expect

const Signature = require('../lib/signature');


describe('Signature', function() {
  describe('#paymentSignatureVerify()', function() {

    it('should throw error when data is invalid', function() {
      expect(function () {
        Signature.paymentSignatureVerify(null, 'secret_key')
      }).to.throw()
    });

  });

  describe('#webhookSignatureVerify()', function() {

    it('should throw error when data is invalid', function() {
      expect(function () {
        Signature.webhookSignatureVerify(null, 'actualSignature', 'secret', 400)
      }).to.throw()
    });

    it('should throw error when actualSignature is invalid', function() {
      expect(function () {
        Signature.webhookSignatureVerify('data', null, 'secret', 400)
      }).to.throw()
    });

    it('should throw error when secret is invalid', function() {
      expect(function () {
        Signature.webhookSignatureVerify('data', 'actualSignature', null, 400)
      }).to.throw()
    });
    
  });


  describe('#computeSignature()', function () {

    it('should throw error when payload is null', function () {
      expect(function () {
        Signature.computeSignature(null, 'secret_key')
      }).to.throw()
    });

    it('should throw error when secret key is null', function () {
      expect(function () {
        Signature.computeSignature('some data', null)
      }).to.throw()
    });

  });

});
