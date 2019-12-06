const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const ordersJSON = require('./data/orders.json');
const orderJSON = require('./data/order.json');
const orderPaymentsJSON = require('./data/order.payments.json');


describe('orders', function() {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/orders').reply(200, orderJSON) });
    it('should create a new order', async function() {
      var order = await payabbhi.orders.create();
      assert.equal(order.object, "order");
      assert.equal(order.id, "order_aCsXtMDdTafnDbHd");
    });
  }); // end of #create()

  describe('#create(params)', function() {
    beforeEach(() => { nock(API_BASE).post('/orders').reply(200, orderJSON) });
    it('should create a new order with params', async function() {
      var order = await payabbhi.orders.create({
        merchant_order_id: 'ORD_001',
        amount: 10000,
        currency: "INR"
      });
      assert.equal(order.object, "order");
      assert.equal(order.id, "order_aCsXtMDdTafnDbHd");
    });
  }); // end of #create(params)

  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/orders/order_aCsXtMDdTafnDbHd').reply(200, orderJSON) });
    it('should retrieve an order', async function() {
      var order = await payabbhi.orders.retrieve('order_aCsXtMDdTafnDbHd');
      assert.equal(order.object, "order");
      assert.equal(order.id, "order_aCsXtMDdTafnDbHd");
    });
  }); // end of #retrieve()

  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/orders').reply(200, ordersJSON) });
    it('should return all orders', async function() {
      var orders = await payabbhi.orders.all();
      assert.equal(orders.total_count, 5);
      assert.equal(orders.object, "list");
      assert.equal(orders.data.length, 2);
    });
  }); // end of #all()

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/orders?count=2').reply(200, ordersJSON) });

    it('should return all orders with params', async function() {
      var orders = await payabbhi.orders.all({count: 2});
      assert.equal(orders.total_count, 5);
      assert.equal(orders.object, "list");
      assert.equal(orders.data.length, 2);
    });
  }); // end of #all(params)

  describe('#payments()', function() {
    beforeEach(() => { nock(API_BASE).get('/orders/order_aCsXtMDdTafnDbHd/payments').reply(200, orderPaymentsJSON) });

    it('should return all payments of an order', async function() {
      var orders = await payabbhi.orders.payments('order_aCsXtMDdTafnDbHd');
      assert.equal(orders.total_count, 1);
      assert.equal(orders.object, "list");
      assert.equal(orders.data.length, 1);
    });
  }); // end of #all(params)

  

});
