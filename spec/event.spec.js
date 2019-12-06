const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockEvent = require('./data/event.json');
const mockEvents = require('./data/events.json');

describe("Events", function () {

  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/events/evt_gCmIpp76zgZynfEO').reply(200, mockEvent) });
    it('should retrieve a event', async function() {
      var event = await payabbhi.events.retrieve('evt_gCmIpp76zgZynfEO');
      assert.equal(event.object, "event");
      assert.equal(event.id, "evt_gCmIpp76zgZynfEO");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/events').reply(200, mockEvents) });
    it('should return events', async function() {
      var events = await payabbhi.events.all();
      assert.equal(events.total_count, 2);
      assert.equal(events.object, "list");
      assert.equal(events.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/events?count=2').reply(200, mockEvents) });
    it('should return events with params', async function() {
      var events = await payabbhi.events.all({count: 2});
      assert.equal(events.total_count, 2);
      assert.equal(events.object, "list");
      assert.equal(events.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/events?count=2&type=payment.captured').reply(200, mockEvents) });
    it('should return events with param type', async function() {
      var events = await payabbhi.events.all({count: 2, type: 'payment.captured'});
      assert.equal(events.total_count, 2);
      assert.equal(events.object, "list");
      assert.equal(events.data.length, 2);
    });
  }); // End of #all(params)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/events?count=2&skip=1&from=15234567&to=15678943&type=payment.captured').reply(200, mockEvents) });
    it('should return events with all params', async function() {
      var events = await payabbhi.events.all({count: 2, skip: 1, from: 15234567, to: 15678943, type: 'payment.captured'});
      assert.equal(events.total_count, 2);
      assert.equal(events.object, "list");
      assert.equal(events.data.length, 2);
    });
  }); // End of #all(params)


}); // End of Events
