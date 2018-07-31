'use strict'
const qs = require('querystring');
const _ = require('lodash');
const errors = require('./errors');
const API_ERROR = "api_error";
const GATEWAY_ERROR = "gateway_error";
const AUTHENTICATION_ERROR = "authentication_error";
const INVALID_REQUEST_ERROR = "invalid_request_error";

class Helpers {

  static url(clazz, id, params) {
    var base = Helpers.withId(clazz, id);
    return Helpers.appendParamsIf(base, params);
  }

  static appendParamsIf(base, params) {
    var ueParams = qs.stringify(params);
    if (ueParams.length !== 0 ) {
      return `${base}?${ueParams}`
    } else {
      return base;
    }
  }

  static withId(clazz, id) {
    var resourceName = Helpers.pluralized(clazz);
    if (id !== undefined && id ) {
      return `/${resourceName}/${id}`;
    } else {
      return `/${resourceName}`;
    }
  }

  static nurl(clazz, id, action, params) {
    var base = Helpers.withId(clazz, id);
    return Helpers.appendParamsIf(`${base}/${action}`, params)
  }

  static pluralized(clazz) {
    if (_.isNil(clazz)) {
      return "";
    }
    return `${clazz.constructor.name.toLowerCase()}s`;
  }

  // sanitize({foo: 1}, (err, data) => {})    params = obj,  cb = func
  // sanitize(null, (err, data) => {})        params = null, cb = func
  // sanitize((err, data) => {})              params = func, cb = null
  // sanitize({foo: 1})                       params = obj,  cb = null
  // sanitize()                               params = null, cb = null

  static sanitize(p, c) {
    if (_.isPlainObject(p) && _.isFunction(c)) {
      return {params: p, cb: c};
    } else if (_.isNil(p) && _.isFunction(c)) {
      return {params: null, cb: c};
    } else if (_.isFunction(p) && _.isNil(c)) {
      return {params: null, cb: p};
    } else if (_.isPlainObject(p) && _.isNil(c)) {
      return {params: p, cb: null};
    } else if (_.isNil(p) && _.isNil(c)) {
      return {params: null, cb: null};
    } else {
      throw "Invalid Configuration";
    }
  }

  static extractError(status, data) {
    switch (data.type) {
      case INVALID_REQUEST_ERROR:
        return new errors.InvalidRequestError(status, data.message, data.field);
      case AUTHENTICATION_ERROR:
        return new errors.AuthenticationError(status, data.message, data.field);
      case GATEWAY_ERROR:
        return new errors.GatewayError(status, data.message, data.field);
      case API_ERROR:
        return new errors.ApiError(status, data.message, data.field);
      default:
        return new errors.ApiError(status, data.message, data.field);
    }
  }
}


module.exports = Helpers;
