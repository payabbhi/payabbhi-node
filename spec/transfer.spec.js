const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockTransfer = require('./data/transfer.json');
const mockTransfers = require('./data/transfers.json');

describe("Transfers", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/payments/pay_W2FmbqANt09epUOz/transfers').reply(200, mockTransfer) });
    it('should create a new transfer', async function() {
      var transfer = await payabbhi.transfers.create('pay_W2FmbqANt09epUOz', {
        transfers: [{
          amount: 100,
          currency: "INR",
          recipient_id: 'recp_Y2ojRlJVqRMhB0Ay'
        }]
      });
      assert.equal(transfer.object, "transfer");
      assert.equal(transfer.id, "trans_ucwszWrXUZJGDgMX");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/transfers/trans_ucwszWrXUZJGDgMX').reply(200, mockTransfer) });
    it('should retrieve a transfer', async function() {
      var transfer = await payabbhi.transfers.retrieve('trans_ucwszWrXUZJGDgMX');
      assert.equal(transfer.object, "transfer");
      assert.equal(transfer.id, "trans_ucwszWrXUZJGDgMX");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers').reply(200, mockTransfers) });
    it('should return transfers', async function() {
      var transfers = await payabbhi.transfers.all();
      assert.equal(transfers.total_count, 3);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers?count=3').reply(200, mockTransfers) });
    it('should return transfers with param', async function() {
      var transfers = await payabbhi.transfers.all({count: 3});
      assert.equal(transfers.total_count, 3);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers?count=3&skip=1&from=15234567&to=15678943').reply(200, mockTransfers) });
    it('should return transfers with all params', async function() {
      var transfers = await payabbhi.transfers.all({count: 3, skip: 1, from: 15234567, to: 15678943});
      assert.equal(transfers.total_count, 3);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all(params)


}); // End of Transfers
