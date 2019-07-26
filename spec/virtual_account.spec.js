const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';
const virtualAccountsJSON = require('./data/virtualAccounts.json');
const virtualAccountJSON = require('./data/virtualAccount.json');
const virtualPaymentsJSON = require('./data/virtualAccount.payments.json');
const virtualAccountCloseJSON = require('./data/virtualAccount.close.json');

describe('virtual_accounts' , function(){

  describe(" #create(params) ",function() {
    beforeEach(() => { nock(API_BASE).post('/virtual_accounts').reply(200, virtualAccountJSON) });
    it('should create a new virtual account with params', async function() {

      let payload = {
        email:"test@example.com",
        contact_no:9999999999,
        description:"virtual_payment",
        collection_methods:["bank_account"],
        notification_method:"both",
        customer_notification_by:"platform",
        notes:{
          channel:"virtual_account"
        }
    };

      var virtualaccount = await payabbhi.virtual_accounts.create(payload);
      assert.equal(virtualaccount.object, "virtual_account");
      assert.equal(virtualaccount.id, "va_FMkEnEGEmHhMKZzL");

    });
  }); // end of #create(params)


  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/virtual_accounts?count=2').reply(200, virtualAccountsJSON) });

    it('should return all virtual accounts with params', async function() {
      var virtualaccounts = await payabbhi.virtual_accounts.all({count: 2});
      assert.equal(virtualaccounts.total_count, 45);
      assert.equal(virtualaccounts.object, "list");
      assert.equal(virtualaccounts.data.length, 2);
    });
  }); // end of #all(params)

  describe('#retrieve()', function() {
    beforeEach(() => { nock(API_BASE).get('/virtual_accounts/va_FMkEnEGEmHhMKZzL').reply(200, virtualAccountJSON) });
    it('should retrieve a virtual account', async function() {
      var virtualaccount = await payabbhi.virtual_accounts.retrieve('va_FMkEnEGEmHhMKZzL');
      assert.equal(virtualaccount.object, "virtual_account");
      assert.equal(virtualaccount.id, "va_FMkEnEGEmHhMKZzL");
    });
  }); // end of #retrieve()

  describe('#payments()' , function() {
    beforeEach(() => { nock(API_BASE).get('/virtual_accounts/va_PakYenlyIIPjGwoU/payments').reply(200,virtualPaymentsJSON)});
    it('should return all payments for a virtual account', async function() {
      var response= await payabbhi.virtual_accounts.payments('va_PakYenlyIIPjGwoU');
      assert.equal(response.total_count, 2);
      assert.equal(response.object, "list");
      assert.equal(response.data.length, 2);
    });
  }); // end of #payments()

  describe('#close()', function() {
    beforeEach(() => { nock(API_BASE).patch('/virtual_accounts/va_FMkEnEGEmHhMKZzL').reply(200, virtualAccountCloseJSON) });

    it('should close a virtual account', async function() {
      var virtualaccount = await payabbhi.virtual_accounts.close('va_FMkEnEGEmHhMKZzL');
      assert.equal(virtualaccount.object, "virtual_account");
      assert.equal(virtualaccount.id, "va_FMkEnEGEmHhMKZzL");
      assert.equal(virtualaccount.status, "closed");
    });
  }); // end of #close()


});
