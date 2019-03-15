const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockSubscription  = require('./data/subscription.json');
const mockSubscriptions = require('./data/subscriptions.json');
const mockCancel        = require('./data/subscription.cancel.json');

describe("Subscriptions", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/subscriptions').reply(200, mockSubscription) });
    it('should create a new subscription', async function() {
      var subscription = await payabbhi.subscriptions.create({
        plan_id: "plan_tuOWN0Sc0uMB4s8E",
        customer_id: "cust_2WmsQoSRZMWWkcZg",
        billing_method: "recurring",
        quantity: 1,
        customer_notification_by: "merchant",
        billing_cycle_count: 5,
        upfront_items: [{
          customer_id: "cust_2WmsQoSRZMWWkcZg",
          name: "Unit Test",
          amount: 100,
          currency: "INR"
        }]
      });
      assert.equal(subscription.object, "subscription");
      assert.equal(subscription.id, "sub_luQ4QIXzaEIN0g5D");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/subscriptions/sub_luQ4QIXzaEIN0g5D').reply(200, mockSubscription) });
    it('should retrieve a subscription', async function() {
      var subscription = await payabbhi.subscriptions.retrieve('sub_luQ4QIXzaEIN0g5D');
      assert.equal(subscription.object, "subscription");
      assert.equal(subscription.id, "sub_luQ4QIXzaEIN0g5D");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/subscriptions').reply(200, mockSubscriptions) });
    it('should return subscriptions', async function() {
      var subscriptions = await payabbhi.subscriptions.all();
      assert.equal(subscriptions.total_count, 2);
      assert.equal(subscriptions.object, "list");
      assert.equal(subscriptions.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/subscriptions?count=2').reply(200, mockSubscriptions) });
    it('should return subscriptions with param', async function() {
      var subscriptions = await payabbhi.subscriptions.all({count: 2});
      assert.equal(subscriptions.total_count, 2);
      assert.equal(subscriptions.object, "list");
      assert.equal(subscriptions.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/subscriptions?count=2&plan_id=plan_tuOWN0Sc0uMB4s8E').reply(200, mockSubscriptions) });
    it('should return subscriptions with params', async function() {
      var subscriptions = await payabbhi.subscriptions.all({count: 2, plan_id: 'plan_tuOWN0Sc0uMB4s8E'});
      assert.equal(subscriptions.total_count, 2);
      assert.equal(subscriptions.object, "list");
      assert.equal(subscriptions.data.length, 2);
    });
  }); // End of #all(params)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/subscriptions?plan_id=plan_tuOWN0Sc0uMB4s8E&status=active&billing_method=recurring&customer_id=cust_2WmsQoSRZMWWkcZg').reply(200, mockSubscriptions) });
    it('should return subscriptions without common pagination params', async function() {
      var subscriptions = await payabbhi.subscriptions.all({plan_id: 'plan_tuOWN0Sc0uMB4s8E', status: 'active', billing_method:'recurring', customer_id: 'cust_2WmsQoSRZMWWkcZg'});
      assert.equal(subscriptions.total_count, 2);
      assert.equal(subscriptions.object, "list");
      assert.equal(subscriptions.data.length, 2);
    });
  }); // End of #all(params)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/subscriptions?count=2&skip=1&from=15234567&to=15678943&plan_id=plan_tuOWN0Sc0uMB4s8E&status=active&billing_method=recurring&customer_id=cust_2WmsQoSRZMWWkcZg').reply(200, mockSubscriptions) });
    it('should return subscriptions with all params', async function() {
      var subscriptions = await payabbhi.subscriptions.all({count: 2, skip: 1, from: 15234567, to: 15678943, plan_id: 'plan_tuOWN0Sc0uMB4s8E', status: 'active', billing_method:'recurring', customer_id: 'cust_2WmsQoSRZMWWkcZg'});
      assert.equal(subscriptions.total_count, 2);
      assert.equal(subscriptions.object, "list");
      assert.equal(subscriptions.data.length, 2);
    });
  }); // End of #all(params)


  describe('#cancel(id)', function() {
    beforeEach(() => {nock(API_BASE).post('/subscriptions/sub_luQ4QIXzaEIN0g5D/cancel').reply(200, mockCancel) });
    it('should cancel the subscription', async function() {
      var subscription = await payabbhi.subscriptions.cancel('sub_luQ4QIXzaEIN0g5D');
      assert.equal(subscription.id, "sub_luQ4QIXzaEIN0g5D");
      assert.equal(subscription.object, "subscription");
      assert.equal(subscription.status, "cancelled");
    });
  }); // End of #cancel(id)

  describe('#cancel(option)', function() {
    beforeEach(() => {nock(API_BASE).post('/subscriptions/sub_luQ4QIXzaEIN0g5D/cancel').reply(200, mockCancel) });
    it('should cancel the subscription with option', async function() {
      var subscription = await payabbhi.subscriptions.cancel('sub_luQ4QIXzaEIN0g5D', {at_billing_cycle_end:false });
      assert.equal(subscription.id, "sub_luQ4QIXzaEIN0g5D");
      assert.equal(subscription.object, "subscription");
      assert.equal(subscription.status, "cancelled");
    });
  }); // End of #cancel(params)

}); // End of Subscriptions
