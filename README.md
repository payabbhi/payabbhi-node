# Payabbhi Node.js Library

Make sure you have signed up for your [Payabbhi Account](https://payabbhi.com/docs/account) and downloaded the [API keys](https://payabbhi.com/docs/account/#api-keys) from the [Portal](https://payabbhi.com/portal).

## Requirements

Node.js v7.6.0 and later.

## Installation

Install the package with:

```
npm install payabbhi --save
```

## Documentation

Please refer to:
- [Node JS Lib Docs](https://payabbhi.com/docs/api/?node)
- [Integration Guide](https://payabbhi.com/docs/integration)


## Usage
A typical usage of the Payabbhi Node Library is shown below:

```js
const payabbhi = require('payabbhi')('<your-access-id>', '<your-secret-key>');


payabbhi.orders.create({
  merchant_order_id: "ORD_001",
  amount: 10000,
  currency: "INR"
}, (error, order) => {

  // error will be null if no error occurred
  // order is the created order object

});

```

## Payment Signature Verification
Payabbhi Node library provides utility functions for verifying the payment signature received in the payment callback.

```js
payabbhi.verifyPaymentSignature({
  "order_id": "<order-id>",
  "payment_id": "<payment-id>",
  "payment_signature": "<payment-signature>"
});

```

## Webhook Signature Verification
Payabbhi Node library provides an utility function for webhook signature verification. 

```js
// replayInterval is optional. Default value is 300 seconds.
payabbhi.verifyWebhookSignature('<payload>','<actualSignature>', '<secret>', <replayInterval>);

```


## Promise support

Payabbhi Node library supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API. Every method returns a promise which can be used instead of callbacks.

A typical usage of the library with promises is shown below:

```js
payabbhi.orders.create({
  merchant_order_id: "ORD_001",
  amount: 10000,
  currency: "INR"
}).then(function (order) {
  ...
}).catch(function (error) {
  ...
});
```
