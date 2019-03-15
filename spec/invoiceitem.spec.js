const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockInvoiceitem = require('./data/invoiceitem.json');
const mockInvoiceitems = require('./data/invoiceitems.json');
const mockItemInvoices = require('./data/item.invoices.json');

describe("Invoiceitems", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/invoiceitems').reply(200, mockInvoiceitem) });
    it('should create a new invoiceitem', async function() {
      var invoiceitem = await payabbhi.invoiceitems.create({
        name: "Line Item",
        amount: 100,
        currency: "INR",
        customer_id: "cust_2WmsQoSRZMWWkcZg",
        invoice_id: "invt_LN3GM0Ea7hVcsgr6",
        subscription_id: "sub_luQ4QIXzaEIN0g5D",
        quantity: 1
      });
      assert.equal(invoiceitem.object, "invoiceitem");
      assert.equal(invoiceitem.id, "item_zvenYE0Tk8qTUaER");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/invoiceitems/item_zvenYE0Tk8qTUaER').reply(200, mockInvoiceitem) });
    it('should retrieve an invoiceitem', async function() {
      var invoiceitem = await payabbhi.invoiceitems.retrieve('item_zvenYE0Tk8qTUaER');
      assert.equal(invoiceitem.object, "invoiceitem");
      assert.equal(invoiceitem.id, "item_zvenYE0Tk8qTUaER");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/invoiceitems').reply(200, mockInvoiceitems) });
    it('should return invoiceitems', async function() {
      var invoiceitems = await payabbhi.invoiceitems.all();
      assert.equal(invoiceitems.total_count, 2);
      assert.equal(invoiceitems.object, "list");
      assert.equal(invoiceitems.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoiceitems?count=2').reply(200, mockInvoiceitems) });
    it('should return invoiceitems with param', async function() {
      var invoiceitems = await payabbhi.invoiceitems.all({count: 2});
      assert.equal(invoiceitems.total_count, 2);
      assert.equal(invoiceitems.object, "list");
      assert.equal(invoiceitems.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoiceitems?count=2&skip=1&from=15234567&to=15678943').reply(200, mockInvoiceitems) });
    it('should return invoiceitems with all params', async function() {
      var invoiceitems = await payabbhi.invoiceitems.all({count: 2, skip: 1, from: 15234567, to: 15678943});
      assert.equal(invoiceitems.total_count, 2);
      assert.equal(invoiceitems.object, "list");
      assert.equal(invoiceitems.data.length, 2);
    });
  }); // End of #all(params)


  describe('#delete()', function() {
    beforeEach(() => { nock(API_BASE).delete('/invoiceitems/item_zvenYE0Tk8qTUaER').reply(200, mockInvoiceitem) });
    it('should return delete an invoiceitem', async function() {
      var invoiceitems = await payabbhi.invoiceitems.delete('item_zvenYE0Tk8qTUaER');
      assert.equal(invoiceitems.id, "item_zvenYE0Tk8qTUaER");
      assert.equal(invoiceitems.object, "invoiceitem");
    });
  }); // End of #delete(params)


  describe('#invoices()', function() {
    beforeEach(() => { nock(API_BASE).get('/invoiceitems/item_zvenYE0Tk8qTUaER/invoices').reply(200, mockItemInvoices) });
    it('should return invoices for an invoiceitem', async function() {
      var invoices = await payabbhi.invoiceitems.invoices('item_zvenYE0Tk8qTUaER');
      assert.equal(invoices.total_count, 2);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
      assert.equal(invoices.data[0].line_items.data[0].id, 'item_zvenYE0Tk8qTUaER');
      assert.equal(invoices.data[1].line_items.data[0].id, 'item_zvenYE0Tk8qTUaER');
    });
  });


}); // End of Invoiceitems
