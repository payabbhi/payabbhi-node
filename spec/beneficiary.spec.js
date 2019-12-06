const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const beneficiaryAccountsJSON = require('./data/beneficiaryAccounts.json');
const beneficiaryAccountJSON = require('./data/beneficiaryAccount.json');

describe('beneficiaryaccounts' , function(){

  describe(" #create(params) ",function() {
    beforeEach(() => { nock(API_BASE).post('/beneficiaryaccounts').reply(200, beneficiaryAccountJSON) });
    it('should create a new beneficiary account with params', async function() {

      let payload = {
      name: "Bruce Wayne",
      beneficiary_name: "ben_test",
      ifsc: "IFSC0001890",
      bank_account_number: 50100000219,
      account_type: "Savings",
      contact_no: 1234567890,
      email: "benf1170@abc.com",
      business_name: "benf_business",
      business_entity_type: "Individual"
    };

      var beneficiary = await payabbhi.beneficiaryaccounts.create(payload);
      assert.equal(beneficiary.object, "beneficiary_account");
      assert.equal(beneficiary.id, "bene_e623672798ee493b");

    });
  }); // end of #create(params)


  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/beneficiaryaccounts/bene_e623672798ee493').reply(200, beneficiaryAccountJSON) });
    it('should retrieve a beneficiary account', async function() {
      var beneficiary = await payabbhi.beneficiaryaccounts.retrieve('bene_e623672798ee493');
      assert.equal(beneficiary.object, "beneficiary_account");
      assert.equal(beneficiary.id, "bene_e623672798ee493b");
    });
  }); // end of #retrieve()

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/beneficiaryaccounts?count=3').reply(200, beneficiaryAccountsJSON) });

    it('should return all beneficiary accounts with params', async function() {
      var beneficiaryaccounts = await payabbhi.beneficiaryaccounts.all({count: 3});
      assert.equal(beneficiaryaccounts.total_count, 45);
      assert.equal(beneficiaryaccounts.object, "list");
      assert.equal(beneficiaryaccounts.data.length, 3);
    });
  }); // end of #all(params)

});
