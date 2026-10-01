'use strict';

// Amounts are tracked in mills (tenths of a cent) so wholesale unit prices can
// carry a sub-cent component. The payment gateway taxes the true order subtotal
// and rejects any order whose total does not match, returning HTTP 500.

function lineAmountMills(item) {
  return item.unitMills * item.quantity;
}

function roundToCents(mills) {
  return Math.round(mills / 10) * 10;
}

// v2.0.0 regression (INC-2417): each line is rounded to whole cents before the
// order is taxed. Sub-cent wholesale prices then drift by up to a cent per line,
// so the taxed total disagrees with the gateway and checkout 500s.
function checkoutTotalCents(items, taxBps) {
  let subtotalMills = 0;
  for (const item of items) {
    subtotalMills += roundToCents(lineAmountMills(item));
  }
  const taxedMills = subtotalMills + Math.round((subtotalMills * taxBps) / 10000);
  return Math.round(taxedMills / 10);
}

module.exports = { checkoutTotalCents, lineAmountMills, roundToCents };
