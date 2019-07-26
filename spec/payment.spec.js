const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const paymentsJSON = require('./data/payments.json');
const paymentJSON = require('./data/payment.json');
const captureJSON = require('./data/capture.json');
const refundsJSON = require('./data/refunds.json');
const transfersJSON = require('./data/transfers.json');
const paymentVirtualAccountJSON = require('./data/payment.virtualAccount.json');

describe('payments', function() {

  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/payments').reply(200, paymentsJSON) });
    it('should list all payments', async function() {
      const payments = await payabbhi.payments.all();

      assert.equal(payments.total_count, 2);
      assert.equal(payments.object, "list");
      assert.equal(payments.data.length, 2);
    });

  }); // end of #all()


  describe('#all(params)', function () {
    beforeEach(() => { nock(API_BASE).get('/payments?count=2').reply(200, paymentsJSON) });

    it('should list all payments', async function() {
      const payments = await payabbhi.payments.all({count: 2});

      assert.equal(payments.total_count, 2);
      assert.equal(payments.object, "list");
      assert.equal(payments.data.length, 2);
    });
  }); // end of #all(params)


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_gtpQ9aBKJfgNHVX4').reply(200, paymentJSON) });

    it('should retrieve a single payment', async function() {
      const payment = await payabbhi.payments.retrieve('pay_gtpQ9aBKJfgNHVX4');

      assert.equal(payment.id, 'pay_gtpQ9aBKJfgNHVX4');
      assert.equal(payment.object, "payment");
      assert.equal(payment.refunds.data.length, 2);
    });
  }); // end of #retrieve()


  describe('#capture()', function () {
    beforeEach(() => { nock(API_BASE).post('/payments/pay_gtpQ9aBKJfgNHVX4/capture').reply(200, captureJSON) });

    it('should capture a payment', async function() {
      const payment = await payabbhi.payments.capture('pay_gtpQ9aBKJfgNHVX4');

      assert.equal(payment.id, 'pay_gtpQ9aBKJfgNHVX4');
      assert.equal(payment.status, "captured");
    });
  }); // end of #capture()


  describe('#refunds()', function () {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_gtpQ9aBKJfgNHVX4/refunds').reply(200, refundsJSON) });

    it('should return refunds of a payment', async function() {
      const refunds = await payabbhi.payments.refunds('pay_gtpQ9aBKJfgNHVX4');

      assert.equal(refunds.total_count, 2);
      assert.equal(refunds.object, 'list');
      assert.equal(refunds.data.length, 2);
    });
  }); // end of #refunds()


  describe('#refunds(params)', function () {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_gtpQ9aBKJfgNHVX4/refunds?count=2').reply(200, refundsJSON) });

    it('should return refunds of a payment with params', async function() {
      const refunds = await payabbhi.payments.refunds('pay_gtpQ9aBKJfgNHVX4', {count: 2});

      assert.equal(refunds.total_count, 2);
      assert.equal(refunds.object, 'list');
      assert.equal(refunds.data.length, 2);
    });
  }); // end of #refunds(params)


  describe('#transfers()', function() {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_zlAsx5g7yH88xcFE/transfers').reply(200, transfersJSON) });
    it('should return the transfers for a payment', async function() {
      var transfers = await payabbhi.payments.transfers('pay_zlAsx5g7yH88xcFE');
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #transfers()

  describe('#transfers(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_zlAsx5g7yH88xcFE/transfers?count=3').reply(200, transfersJSON) });
    it('should return the transfers for a payment with param', async function() {
      var transfers = await payabbhi.payments.transfers('pay_zlAsx5g7yH88xcFE', {count: 3});
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #transfers(param)

  describe('#transfers(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_zlAsx5g7yH88xcFE/transfers?count=3&skip=1&from=15234567&to=15678943').reply(200, transfersJSON) });
    it('should return the transfers for a payment with all params', async function() {
      var transfers = await payabbhi.payments.transfers('pay_zlAsx5g7yH88xcFE', {count: 3, skip: 1, from: 15234567, to: 15678943});
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #transfers(params)

  describe('#transfer(param)', function() {
    beforeEach(() => { nock(API_BASE).post('/payments/pay_zlAsx5g7yH88xcFE/transfers').reply(200, transfersJSON) });

    it('should create a transfer for a payment ', async function() {
      var response = await payabbhi.payments.transfer('pay_zlAsx5g7yH88xcFE' ,{
          transfers: [{
            amount: 100,
            currency: "INR",
            beneficiary_id: 'bene_Za30i2k3p6blq3i1'
          }]
        });
        assert.equal(response.object, "list");
        assert.equal(response.total_count, 41);
        assert.equal(response.data.length,3);
        assert.equal(response.data[0].source_id,"pay_zlAsx5g7yH88xcFE");
    });
  });// End of #transfer(param)

  describe('#virtual_account(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/payments/pay_4I4NDogajGtV9bVo/virtual_account').reply(200, paymentVirtualAccountJSON) });

    it('should retrieve virtual account details for a payment', async function() {
      var response = await payabbhi.payments.virtual_account('pay_4I4NDogajGtV9bVo');
      assert.equal(response.object, "payment");
      assert.equal(response.id,"pay_4I4NDogajGtV9bVo");
    });

  });// End of #virtual_account(param)

});
