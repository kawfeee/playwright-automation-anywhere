import fs from 'fs';
import path from 'path';

import { expect, test } from '@playwright/test';

import { ApiHelper } from '../utils/apiHelper.js';
import { apiConfig } from '../utils/config.js';

test('Create Learning Instance', async ({ request }) => {
  const api = new ApiHelper(request, apiConfig);

  // Authenticate
  const login = await api.login();

  expect(login.response.status()).toBe(200);

  const token = login.token;

  expect(token).toBeTruthy();

  console.log('Token received:', token.substring(0, 50) + '...');

  // Read payload
  const payload = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'fixtures', 'learningInstancePayload.json'),
      'utf8'
    )
  );

  // Change only the Learning Instance name
  payload.name = `test_${Date.now()}`;

  // Create Learning Instance
  const response = await api.createLearningInstance(payload, token);

  console.log('Create Status:', response.status());

  const body = await response.text();

  console.log('Create Response:', body);

  expect(response.status()).toBe(200);
});