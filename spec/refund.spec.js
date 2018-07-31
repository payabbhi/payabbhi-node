const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const refundsJSON = require('./data/refunds.json');
const refundJSON = require('./data/refund.json');


describe('refunds', function() {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/payments/pay_mUy6UYsRvIxH9Qi2/refunds').reply(200, refundJSON) });
    it('should create a new refund', async function() {
      var refund = await payabbhi.refunds.create('pay_mUy6UYsRvIxH9Qi2');
      assert.equal(refund.object, "refund");
      assert.equal(refund.id, "rfnd_02iOL6yHtrTTVYSw");
    });
  }); // end of #create()

  describe('#create(params)', function() {
    beforeEach(() => { nock(API_BASE).post('/payments/pay_mUy6UYsRvIxH9Qi2/refunds').reply(200, refundJSON) });
    it('should create a new refund', async function() {
      var refund = await payabbhi.refunds.create('pay_mUy6UYsRvIxH9Qi2', {amount: 200});
      assert.equal(refund.object, "refund");
      assert.equal(refund.id, "rfnd_02iOL6yHtrTTVYSw");
    });
  }); // end of #create(params)

  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/refunds/rfnd_02iOL6yHtrTTVYSw').reply(200, refundJSON) });
    it('should retrieve a refund', async function() {
      var refund = await payabbhi.refunds.retrieve('rfnd_02iOL6yHtrTTVYSw');
      assert.equal(refund.object, "refund");
      assert.equal(refund.id, "rfnd_02iOL6yHtrTTVYSw");
    });
  }); // end of #retrieve()

  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/refunds').reply(200, refundsJSON) });
    it('should return all refunds', async function() {
      var refunds = await payabbhi.refunds.all();
      assert.equal(refunds.total_count, 2);
      assert.equal(refunds.object, "list");
      assert.equal(refunds.data.length, 2);
    });
  }); // end of #all()

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/refunds?count=2').reply(200, refundsJSON) });

    it('should return all refunds with params', async function() {
      var refunds = await payabbhi.refunds.all({count: 2});
      assert.equal(refunds.total_count, 2);
      assert.equal(refunds.object, "list");
      assert.equal(refunds.data.length, 2);
    });
  }); // end of #all(params)


});
