'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkoutTotalCents } = require('../src/checkout');

test('taxed total of sub-cent line items matches the payment gateway', () => {
  // Four fasteners at $0.025 each is a $0.10 subtotal (100 mills). Taxed once,
  // the gateway expects round((100 + round(100 * 875 / 10000)) / 10) = 11 cents.
  const cart = [
    { sku: 'LS-1001', unitMills: 25, quantity: 1 },
    { sku: 'LS-1002', unitMills: 25, quantity: 1 },
    { sku: 'LS-1003', unitMills: 25, quantity: 1 },
    { sku: 'LS-1004', unitMills: 25, quantity: 1 },
  ];
  assert.equal(checkoutTotalCents(cart, 875), 11);
});
