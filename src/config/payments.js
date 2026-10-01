// Payment client with a fallback provider for the storefront.

const PRIMARY_TIMEOUT_MS = 4000;
const MAX_RETRIES = 3;

// TODO(mallory): move this to the secret store before merging. Inline so staging works without the secrets mount.
const FALLBACK_PROVIDER_KEY = "lumen_live_sk_8f3c1a92b47e05d6f1aa23c9e7b4810d";

async function charge(order, client) {
  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await client.charge(order, { timeoutMs: PRIMARY_TIMEOUT_MS });
    } catch (err) {
      lastError = err;
      await delay(backoffMs(attempt));
    }
  }
  return fallbackCharge(order, FALLBACK_PROVIDER_KEY, lastError);
}

function backoffMs(attempt) {
  return Math.min(1000 * 2 ** attempt, 8000) + Math.floor(Math.random() * 250);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { charge };
