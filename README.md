# Lumen Supply storefront

Synthetic checkout service for the Lumen Supply demo. Everything here is fictional.

The checkout total is computed in `src/checkout.js`. Run the suite with:

```
npm test
```

Since the v2.0.0 cutover, orders with sub-cent wholesale pricing are being rejected
by the payment gateway with HTTP 500 (see INC-2417).
