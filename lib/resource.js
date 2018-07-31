'use strict'
const _ = require('lodash');
const Fetcher = require('./fetcher');

class Resource {
	constructor(config) {
		this.config = config;
		if (config) {
			this.fetcher = new Fetcher(this.config);
		}

	}

	request(method, url, body, cb) {
		return this.fetcher.fetch(method, url, body, cb);
	}
}

module.exports = Resource;
