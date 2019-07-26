const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const transferJSON = require('./data/transfer.json');
const transfersJSON = require('./data/transfers.json');
// const createDirectTransferJSON = require('./data/transferDirect.create.json');

describe("Transfers", function () {

  describe('#create ()', function() {

    beforeEach(() => { nock(API_BASE).post('/transfers').reply(200, transfersJSON) });
    it('should create a new direct transfer', async function() {
      var response = await payabbhi.transfers.create({
        transfers: [{
          source_id: "pay_zlAsx5g7yH88xcFE",
          amount: 30,
          currency: "INR",
          description: "Tranfer 2",
          beneficiary_id: 'bene_Za30i2k3p6blq3i1'
        },
        {
            source_id: "pay_zlAsx5g7yH88xcFE",
            amount: 20,
            currency: "INR",
            description: "Tranfer 1",
            beneficiary_id: 'bene_Za30i2k3p6blq3i1'
        },
        {
          source_id: "pay_zlAsx5g7yH88xcFE",
          amount: 30,
          currency: "INR",
          description: "Tranfer 2",
          beneficiary_id: 'bene_Za30i2k3p6blq3i1'
        }
        ]
      });
      assert.equal(response.object, "list");
      assert.equal(response.total_count, 41);
      assert.equal(response.data.length,3);
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => {
      nock(API_BASE).get('/transfers/trans_mjf5M8vnn3wDC46K').reply(200, transferJSON);
    });
    it('should retrieve a transfer', async function() {
      var transfer = await payabbhi.transfers.retrieve('trans_mjf5M8vnn3wDC46K');
      assert.equal(transfer.object, "transfer");
      assert.equal(transfer.id, "trans_mjf5M8vnn3wDC46K");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers').reply(200, transfersJSON) });
    it('should return transfers', async function() {
      var transfers = await payabbhi.transfers.all();
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers?count=3').reply(200, transfersJSON) });

    it('should return transfers with param', async function() {
      var transfers = await payabbhi.transfers.all({count: 3});
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/transfers?count=3&skip=1&from=15234567&to=15678943').reply(200, transfersJSON) });
    it('should return transfers with all params', async function() {
      var transfers = await payabbhi.transfers.all({count: 3, skip: 1, from: 15234567, to: 15678943});
      assert.equal(transfers.total_count, 41);
      assert.equal(transfers.object, "list");
      assert.equal(transfers.data.length, 3);
    });
  }); // End of #all(params)
}); // End of Transfers
