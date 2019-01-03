const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockCustomer  = require('./data/customer.json');
const mockCustomers = require('./data/customers.json');
const mockUpdate    = require('./data/customer.update.json');


describe("Customers", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/customers').reply(200, mockCustomer) });
    it('should create a new customer', async function() {
      var customer = await payabbhi.customers.create({
        name: "Bruce",
        email: "a@b.com",
        contact_no: "9999999999",
        billing_address: {
          address_line1: "12 Baker Street",
          address_line2: "Near Temple",
          city: "Kolkata",
          state: "West Bengal",
          pin: "700156"
        },
        shipping_address: {
          address_line1: "12 Baker Street",
          address_line2: "Near Temple",
          city: "Kolkata",
          state: "West Bengal",
          pin: "700156"
        }
      });
      assert.equal(customer.object, "customer");
      assert.equal(customer.id, "cust_yaTTsvmCu8Lqs7Ek");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/customers/cust_yaTTsvmCu8Lqs7Ek').reply(200, mockCustomer) });
    it('should retrieve a customer', async function() {
      var customer = await payabbhi.customers.retrieve('cust_yaTTsvmCu8Lqs7Ek');
      assert.equal(customer.object, "customer");
      assert.equal(customer.id, "cust_yaTTsvmCu8Lqs7Ek");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/customers').reply(200, mockCustomers) });
    it('should return customers', async function() {
      var customers = await payabbhi.customers.all();
      assert.equal(customers.total_count, 3);
      assert.equal(customers.object, "list");
      assert.equal(customers.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/customers?count=2').reply(200, mockCustomers) });
    it('should return customers with param', async function() {
      var customers = await payabbhi.customers.all({count: 2});
      assert.equal(customers.total_count, 3);
      assert.equal(customers.object, "list");
      assert.equal(customers.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/customers?count=2&skip=1&from=15234567&to=15678943').reply(200, mockCustomers) });
    it('should return customers with all params', async function() {
      var customers = await payabbhi.customers.all({count: 2, skip: 1, from: 15234567, to: 15678943});
      assert.equal(customers.total_count, 3);
      assert.equal(customers.object, "list");
      assert.equal(customers.data.length, 2);
    });
  }); // End of #all(params)


  describe('#edit(params)', function() {
    beforeEach(() => { nock(API_BASE).put('/customers/cust_yaTTsvmCu8Lqs7Ek').reply(200, mockUpdate) });
    it('should update the customer', async function() {
      var customer = await payabbhi.customers.edit('cust_yaTTsvmCu8Lqs7Ek', {
        email: "nodetest@node.com",
        contact_no: "1234567890",
        name: "Updated Bruce"
      });
      assert.equal(customer.id, "cust_yaTTsvmCu8Lqs7Ek");
      assert.equal(customer.object, "customer");
      assert.equal(customer.email, "nodetest@node.com");
      assert.equal(customer.contact_no, "1234567890");
      assert.equal(customer.name, "Updated Bruce");
    });
  }); // End of #edit(params)


}); // End of Customers
