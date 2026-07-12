import fs from 'node:fs';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { apiConfig } from '../utils/config.js';
import { ApiHelper } from '../utils/apiHelper.js';

const payloadPath = path.resolve(process.cwd(), 'fixtures/learningInstancePayload.json');

test.describe('Use Case 2 - API Automation', () => {
  test('authenticate (200), create Learning Instance (200/201), validate response fields, and print outputs', async ({ request }) => {
    const apiHelper = new ApiHelper(request, apiConfig);

    const loginResponse = await apiHelper.login();
    expect(loginResponse.response.status()).toBe(200);

    const token = loginResponse.token;
    expect(token).toBeTruthy();

    const rawPayload = fs.readFileSync(payloadPath, 'utf-8');
    const payload = JSON.parse(rawPayload);

    payload.name = `Playwright_API_${Date.now()}`;

    const start = Date.now();
    const { response, responseBody } = await apiHelper.createLearningInstance(payload, token);
    const responseTimeMs = Date.now() - start;

    if (!response.ok()) {
      // Print response body on failures (requested)
      // eslint-disable-next-line no-console
      console.error('Create Learning Instance failed response body:', responseBody);
      throw new Error(
        `Create Learning Instance failed: status=${response.status()} responseBody=${JSON.stringify(responseBody)}`
      );
    }

    // Status code assertions (requested)
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);

    // Response time assertion (requested)
    expect(responseTimeMs).toBeLessThan(5000);

    // Body checks (requested)
    expect(responseBody).toBeTruthy();
    expect(responseBody.id).toBeTruthy();

    // name check (only if returned by API) (requested)
    if (responseBody.name) {
      expect(responseBody.name).toBe(payload.name);
    }

    // Prints (requested)
    // eslint-disable-next-line no-console
    console.log('Created Learning Instance ID:', responseBody.id);
    // eslint-disable-next-line no-console
    console.log('Created Learning Instance Name:', responseBody.name ?? '(name missing)');
    // eslint-disable-next-line no-console
    console.log('Response Time (ms):', responseTimeMs);

    // TODO: Validate created Learning Instance using GET API after endpoint is identified.
  });
});
