const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockPlan = require('./data/plan.json');
const mockPlans = require('./data/plans.json');

describe("Plans", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/plans').reply(200, mockPlan) });
    it('should create a new plan', async function() {
      var plan = await payabbhi.plans.create({
        product_id: "prod_wJ6DyX5Bgg2LqAqt",
        name: "Basic",
        amount: 100,
        currency: "INR",
        frequency: 2,
        interval: "month(s)"
      });
      assert.equal(plan.object, "plan");
      assert.equal(plan.id, "plan_tuOWN0Sc0uMB4s8E");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/plans/plan_tuOWN0Sc0uMB4s8E').reply(200, mockPlan) });
    it('should retrieve a plan', async function() {
      var plan = await payabbhi.plans.retrieve('plan_tuOWN0Sc0uMB4s8E');
      assert.equal(plan.object, "plan");
      assert.equal(plan.id, "plan_tuOWN0Sc0uMB4s8E");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/plans').reply(200, mockPlans) });
    it('should return plans', async function() {
      var plans = await payabbhi.plans.all();
      assert.equal(plans.total_count, 3);
      assert.equal(plans.object, "list");
      assert.equal(plans.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/plans?count=2').reply(200, mockPlans) });
    it('should return plans with param', async function() {
      var plans = await payabbhi.plans.all({count: 2});
      assert.equal(plans.total_count, 3);
      assert.equal(plans.object, "list");
      assert.equal(plans.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/plans?count=2&product_id=prod_wJ6DyX5Bgg2LqAqt').reply(200, mockPlans) });
    it('should return plans with param product_id', async function() {
      var plans = await payabbhi.plans.all({count: 2, product_id: 'prod_wJ6DyX5Bgg2LqAqt'});
      assert.equal(plans.total_count, 3);
      assert.equal(plans.object, "list");
      assert.equal(plans.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/plans?count=2&skip=1&from=15234567&to=15678943&product_id=prod_wJ6DyX5Bgg2LqAqt').reply(200, mockPlans) });
    it('should return plans with all params', async function() {
      var plans = await payabbhi.plans.all({count: 2, skip: 1, from: 15234567, to: 15678943, product_id: 'prod_wJ6DyX5Bgg2LqAqt'});
      assert.equal(plans.total_count, 3);
      assert.equal(plans.object, "list");
      assert.equal(plans.data.length, 2);
    });
  }); // End of #all(params)


}); // End of plans
