const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const settlementsJSON = require('./data/settlements.json');
const settlementJSON = require('./data/settlement.json');


describe('settlements' , function() {

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/settlements?count=2').reply(200, settlementsJSON) });

    it('should return list of settlement details created', async function() {
      var settlementaccounts = await payabbhi.settlements.all({count: 2});
      assert.equal(settlementaccounts.total_count, 2);
      assert.equal(settlementaccounts.object, "list");
      assert.equal(settlementaccounts.data.length, 2);
    });
  }); // end of #all(params)

  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/settlements/stl_wmjBUMNyLnzGbFKU').reply(200, settlementJSON) });
    it('should retrieve a settlement', async function() {
      var settlement = await payabbhi.settlements.retrieve('stl_wmjBUMNyLnzGbFKU');
      assert.equal(settlement.object, "settlement");
      assert.equal(settlement.id, "stl_wmjBUMNyLnzGbFKU");
    });
  }); // end of #retrieve()

});
