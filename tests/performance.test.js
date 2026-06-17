import { describe, it } from 'node:test';
import assert from 'node:assert';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const MAX_RESPONSE_TIME_MS = 2000; // 2 seconds threshold

describe('Performance Tests', () => {
  
  it('homepage should load in under 2 seconds', async () => {
    const start = Date.now();
    const response = await fetch(`${BASE_URL}/`);
    const duration = Date.now() - start;
    
    assert.strictEqual(response.status, 200);
    assert.ok(
      duration < MAX_RESPONSE_TIME_MS,
      `Homepage took ${duration}ms, expected < ${MAX_RESPONSE_TIME_MS}ms`
    );
    
    console.log(`✅ Homepage loaded in ${duration}ms`);
  });

  it('/shop page should load in under 2 seconds', async () => {
    const start = Date.now();
    const response = await fetch(`${BASE_URL}/shop`);
    const duration = Date.now() - start;
    
    assert.strictEqual(response.status, 200);
    assert.ok(
      duration < MAX_RESPONSE_TIME_MS,
      `Shop page took ${duration}ms, expected < ${MAX_RESPONSE_TIME_MS}ms`
    );
    
    console.log(`✅ Shop page loaded in ${duration}ms`);
  });

  it('should handle 10 concurrent requests', async () => {
    const requests = Array(10).fill(null).map(() => 
      fetch(`${BASE_URL}/`).then(r => r.status)
    );
    
    const results = await Promise.all(requests);
    const allSuccessful = results.every(status => status === 200);
    
    assert.ok(allSuccessful, 'All 10 concurrent requests should return 200');
    console.log(`✅ All 10 concurrent requests succeeded`);
  });

});