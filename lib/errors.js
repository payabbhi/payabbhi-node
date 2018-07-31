'use strict'

class PayabbhiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, PayabbhiError);
  }
}

class AuthenticationError extends PayabbhiError {
  constructor(status, message, field) {
    super(`HTTP status ${status} - ${message} - [field: ${field}]`);
    this.status = status;
    this.emessage = message;
    this.field = field;
    Error.captureStackTrace(this, AuthenticationError);
  }
}

class GatewayError extends PayabbhiError {
  constructor(status, message, field) {
    super(`HTTP status ${status} - ${message} - [field: ${field}]`);
    this.status = status;
    this.emessage = message;
    this.field = field;
    Error.captureStackTrace(this, GatewayError);
  }
}


class InvalidRequestError extends PayabbhiError {
  constructor(status, message, field) {
    super(`HTTP status ${status} - ${message} - [field: ${field}]`);
    this.status = status;
    this.emessage = message;
    this.field = field;
    Error.captureStackTrace(this, InvalidRequestError);
  }
}


class ApiError extends PayabbhiError {
  constructor(status, message, field) {
    super(`HTTP status ${status} - ${message} - [field: ${field}]`);
    this.status = status;
    this.emessage = message;
    this.field = field;
    Error.captureStackTrace(this, ApiError);
  }
}

module.exports.PayabbhiError = PayabbhiError;
module.exports.AuthenticationError = AuthenticationError;
module.exports.GatewayError = GatewayError;
module.exports.InvalidRequestError = InvalidRequestError;
module.exports.ApiError = ApiError;
