const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const paymentLinksJSON = require('./data/paymentLinks.json');
const paymentLinkJSON = require('./data/paymentLink.json');
const paymentLinkPaymentsJSON = require('./data/paymentLink.payments.json');
const paymentLinkCancelJSON = require('./data/paymentLink.cancel.json');


describe('payment_link', function() {

  describe('#create(params)', function() {
    beforeEach(() => { nock(API_BASE).post('/payment_links').reply(200, paymentLinkJSON) });
    it('should create a new payment link with params', async function() {
      var payment_link = await payabbhi.payment_links.create({
        amount: 10000,
        currency: "INR"
      });
      assert.equal(payment_link.object, "payment_link");
      assert.equal(payment_link.id, "invc_NRFJkTGyZYo03cPD");
    });
  }); // end of #create(params)

  describe('#cancel(id)', function() {
    beforeEach(() => {nock(API_BASE).post('/payment_links/invc_NRFJkTGyZYo03cPD/cancel').reply(200,paymentLinkCancelJSON) });
    it('should cancel a payment link', async function() {
      var payment_link = await payabbhi.payment_links.cancel('invc_NRFJkTGyZYo03cPD');
      assert.equal(payment_link.id, "invc_NRFJkTGyZYo03cPD");
      assert.equal(payment_link.object, "payment_link");
      assert.equal(payment_link.status, "cancelled");
    });
  }); // End of #cancel(id)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/payment_links?count=2').reply(200, paymentLinksJSON) });

    it('should return all payment links with params', async function() {
      var response = await payabbhi.payment_links.all({count: 2});
      assert.equal(response.total_count, 2);
      assert.equal(response.object, "list");
      assert.equal(response.data.length, 2);
    });
  }); // end of #all(params)

  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/payment_links/invc_NRFJkTGyZYo03cPD').reply(200, paymentLinkJSON) });
    it('should retrieve a payment link', async function() {
      var payment_link = await payabbhi.payment_links.retrieve('invc_NRFJkTGyZYo03cPD');
      assert.equal(payment_link.object, "payment_link");
      assert.equal(payment_link.id, "invc_NRFJkTGyZYo03cPD");
    });
  }); // end of #retrieve()

  describe('#payments()', function() {
    beforeEach(() => { nock(API_BASE).get('/payment_links/invc_NRFJkTGyZYo03cPD/payments').reply(200, paymentLinkPaymentsJSON) });

    it('should return all payments for a given payment link', async function() {
      var response = await payabbhi.payment_links.payments('invc_NRFJkTGyZYo03cPD');
      assert.equal(response.total_count, 1);
      assert.equal(response.object, "list");
      assert.equal(response.data.length, 1);
    });
  }); // end of #all(params)



});
