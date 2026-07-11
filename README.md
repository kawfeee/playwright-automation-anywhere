# Automation Assignment

This project uses Playwright Test with a clean Page Object Model structure.

## Structure

- `pages/` for page objects
- `tests/` for Playwright specs
- `utils/` for shared helpers or fixtures

## Current scaffold

- `pages/LoginPage.js` contains a placeholder `LoginPage` class.
- `tests/login.spec.js` contains a placeholder login test.
- Locators, URLs, credentials, and assertions are intentionally left for manual implementation after inspecting the application.

## Credentials

Store your real username and password in environment variables named `PLAYWRIGHT_LOGIN_USERNAME` and `PLAYWRIGHT_LOGIN_PASSWORD`.
Keep them out of source control and set them in your local shell, CI secrets, or a local `.env` workflow if you add dotenv later.
If you are using the provided `.env` file at the project root, place the values on these lines:

- `PLAYWRIGHT_LOGIN_USERNAME=your_username`
- `PLAYWRIGHT_LOGIN_PASSWORD=your_password`

## Run tests

```bash
npm test
```