import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test.describe('Login flow', () => {
  test('User can login successfully', async ({ page }) => {
    const username = process.env.PLAYWRIGHT_LOGIN_USERNAME ?? '';
    const password = process.env.PLAYWRIGHT_LOGIN_PASSWORD ?? '';

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(username, password);

    // await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // TODO: Add dashboard verification assertions here.
    // TODO: Add a negative-path assertion if invalid credentials need coverage later.
  });
});