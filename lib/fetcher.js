'use strict'
const axios = require('axios');
const Helpers = require('./helpers');

class Fetcher {
  constructor(config) {
    this.config = config;
    this.instance = axios.create({
		  baseURL: this.config.baseURL,
		  auth: {
				username: this.config.accessId,
				password: this.config.secretKey
			},
			headers: this.config.headers()
		});

  }

  fetch(method, url, body, cb) {
    return this.instance.request({
			method: method,
			url: url,
			data: this.bodyIf(method, body)
		}).then(response => {
			cb && cb(null, response.data);
			return response.data;
		}).catch(function (error) {
      var e = Helpers.extractError(error.response.status, error.response.data.error);

      if (cb) {
        cb(e, null);
      } else {
        throw e;
      }
		});
  }

  bodyIf(method, body) {
    if (method === 'GET') {
      return null;
    } else {
      return JSON.stringify(body);
    }
  }

}

module.exports = Fetcher;
