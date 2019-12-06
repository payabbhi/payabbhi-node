const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockProduct = require('./data/product.json');
const mockProducts = require('./data/products.json');

describe("Products", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/products').reply(200, mockProduct) });
    it('should create a new product', async function() {
      var product = await payabbhi.products.create({
        name: "Books",
        unit_label: "MB",
        notes: {
          genre: "comedy"
        }
      });
      assert.equal(product.object, "product");
      assert.equal(product.id, "prod_v0RYyTj4qEj56c12");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/products/prod_v0RYyTj4qEj56c12').reply(200, mockProduct) });
    it('should retrieve a product', async function() {
      var product = await payabbhi.products.retrieve('prod_v0RYyTj4qEj56c12');
      assert.equal(product.object, "product");
      assert.equal(product.id, "prod_v0RYyTj4qEj56c12");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/products').reply(200, mockProducts) });
    it('should return products', async function() {
      var products = await payabbhi.products.all();
      assert.equal(products.total_count, 2);
      assert.equal(products.object, "list");
      assert.equal(products.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/products?count=2').reply(200, mockProducts) });
    it('should return products with param', async function() {
      var products = await payabbhi.products.all({count: 2});
      assert.equal(products.total_count, 2);
      assert.equal(products.object, "list");
      assert.equal(products.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/products?count=2&skip=1&from=15234567&to=15678943').reply(200, mockProducts) });
    it('should return products with all params', async function() {
      var products = await payabbhi.products.all({count: 2, skip: 1, from: 15234567, to: 15678943});
      assert.equal(products.total_count, 2);
      assert.equal(products.object, "list");
      assert.equal(products.data.length, 2);
    });
  }); // End of #all(params)


}); // End of Products
