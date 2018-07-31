const assert = require('chai').assert;
const expect = require('chai').expect

const Signature = require('../lib/signature');


describe('Signature', function() {
  describe('#verify()', function() {

    it('should throw error when data is invalid', function() {
      expect(function () {
        Signature.verify(null, 'secret_key')
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
