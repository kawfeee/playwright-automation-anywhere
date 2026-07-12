import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import FormsPage from '../pages/FormsPage.js';
import RulesPage from '../pages/RulesPage.js';

test.describe('Login flow', () => {
  test('User can login successfully', async ({ page }) => {
    const username = process.env.PLAYWRIGHT_LOGIN_USERNAME ?? '';
    const password = process.env.PLAYWRIGHT_LOGIN_PASSWORD ?? '';

    // Open the login page and sign in with credentials from the local environment.
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(username, password);

    // Switch to the dashboard page object after a successful login.
    const dashboardPage = new DashboardPage(page);

    // Navigate through the dashboard to reach the Create Form flow.
    await dashboardPage.clickAutomation();
    await dashboardPage.clickCreate();
    await dashboardPage.clickForms();
    await dashboardPage.clickCreateForm();

    // Add a textbox to the form canvas using the existing FormsPage abstraction.
    const formsPage = new FormsPage(page);

    // Add both textboxes first so each one can be configured independently.
    await formsPage.addTwoTextboxes();

    // Configure the first textbox with one set of meaningful values.
    await formsPage.configureTextbox(
      {
        label: 'Primary Customer Name',
        hint: 'Enter the customer name for this form',
        tooltip: 'Use the legal customer name as it appears in records',
        defaultValue: 'Acme Corp',
        minLength: '3',
        maxLength: '50',
      },
      0,
    );

    // Configure the second textbox with a different set of meaningful values.
    await formsPage.configureTextbox(
      {
        label: 'Secondary Contact Name',
        hint: 'Enter the backup contact name',
        tooltip: 'This contact is used only when the primary contact is unavailable',
        defaultValue: 'Jane Doe',
        minLength: '2',
        maxLength: '40',
      },
      1,
    );

    // Switch to the rules tab and create Rule 1 only.
    const rulesPage = new RulesPage(page);
    await rulesPage.createRule();

    // Save the form after the textbox and rule configuration is complete.
    await formsPage.saveForm();

    // Placeholder assertion for the Create Form page until the final application-specific check is defined.
    await expect(page).toHaveURL(/#/);

    // TODO: Replace the placeholder assertion with a Create Form page-specific check.
    // TODO: Add a negative-path assertion if invalid credentials need coverage later.
  });
});