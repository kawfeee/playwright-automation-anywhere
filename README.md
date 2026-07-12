# Use Case 1 – UI Automation

## Overview

This project implements **Use Case 1 (UI Automation)** using the **Playwright Test Framework** with **JavaScript**. The automation framework is built following the **Page Object Model (POM)** design pattern to ensure code reusability, maintainability, and scalability.

All the requirements specified for **Use Case 1** have been successfully implemented. The project is organized in a modular structure with separate folders for page objects, test cases, utilities, and test data, making it easy to maintain and extend.

---

# Framework & Tools Used

- **Playwright Test Framework**
- **JavaScript (ES6+)**
- **Node.js**
- **npm**
- **dotenv** (Environment Variable Management)

---

# Project Structure

```
automation-assignment/
│
├── fixtures/
│   └── learningInstancePayload.json
│
├── pages/
│   ├── DashboardPage.js
│   ├── FormsPage.js
│   ├── LoginPage.js
│   └── RulesPage.js
│
├── tests/
│   ├── useCase1.spec.js
│   ├── usecase2.spec.js
│   └── example.spec.js
│
├── utils/
│   ├── apiHelper.js
│   └── config.js
│
├── .env
├── playwright.config.js
├── package.json
└── README.md
```

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <repository-url>
cd automation-assignment
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Install Playwright Browsers

```bash
npx playwright install
```

---

# Environment Configuration

Create a **`.env`** file in the project root and add the required login credentials.

Example:

```env
PLAYWRIGHT_LOGIN_USERNAME=your_username
PLAYWRIGHT_LOGIN_PASSWORD=your_password
```

Replace the placeholder values with valid application credentials before running the tests.

---

### Notes (important)

- The automation uses the default form name **"Untitled"** while creating a new form.
- The script does **not** generate a unique form name for every execution.
- If a form with the name **"Untitled"** already exists in your Automation Anywhere account, please **delete the existing form before running the test**.
- This avoids duplicate name conflicts and ensures the automation completes successfully without any manual intervention during execution.

# Running Use Case 1

To execute only the **Use Case 1 UI Automation** tests, run:

```bash
npx playwright test tests/useCase1.spec.js
```

### Run in Headed Mode

```bash
npx playwright test tests/useCase1.spec.js --headed
```

### Run on Chromium Only

```bash
npx playwright test tests/useCase1.spec.js --project=chromium
```

---

# Test Report

After execution, view the Playwright HTML report using:

```bash
npx playwright show-report
```

---

# Features Implemented

The following requirements for **Use Case 1** have been successfully implemented:

- ✅ UI Automation using **Playwright Test Framework**
- ✅ JavaScript-based implementation
- ✅ Page Object Model (POM) architecture
- ✅ Reusable page classes
- ✅ Clean separation of page actions and test logic
- ✅ Organized folder structure
- ✅ Environment-based configuration using `.env`
- ✅ Descriptive and maintainable test cases
- ✅ Independent execution of UI tests
- ✅ Playwright HTML reporting support

---

# Test Organization

All UI automation test cases for **Use Case 1** are organized under:

```
tests/useCase1.spec.js
```

The test cases use descriptive test names and follow Playwright Test best practices, allowing them to be executed independently without impacting other use cases.

---

# Notes

- The existing project structure has been preserved throughout the implementation.
- Sensitive information such as login credentials is stored using environment variables and is **not hardcoded**.
- The framework follows a modular and reusable design, making it easy to add or maintain future test cases.
- **All the requirements specified for Use Case 1 have been successfully fulfilled.**


#############################################################################
#############################################################################


# Use Case 2 – API Automation

## Overview

This project implements **Use Case 2 (API Automation)** using the **Playwright Test Framework** with **JavaScript**. The objective is to automate the Learning Instance creation workflow through REST APIs while keeping the existing UI automation framework completely unchanged.

The API automation has been implemented in a modular manner by separating reusable API methods, configuration values, test data, and test scripts into dedicated files.

---

# Framework & Tools Used

- **Playwright Test Framework**
- **JavaScript (ES6+)**
- **Node.js**
- **REST APIs**
- **dotenv** (Environment Variable Management)

---

# Project Structure

```
tests/
│
└── usecase2.spec.js

utils/
├── apiHelper.js
└── config.js

fixtures/
└── learningInstancePayload.json
```

- **usecase2.spec.js** – Contains the API test flow.
- **apiHelper.js** – Contains reusable API methods.
- **config.js** – Stores configurable values such as Base URL, API endpoints, and credentials.
- **learningInstancePayload.json** – Stores the request payload used for Learning Instance creation.

---

# Environment Configuration

Create a **`.env`** file in the project root.

Example:

```env
PLAYWRIGHT_LOGIN_USERNAME=your_username
AA_PASSWORD_ENCRYPTED=your_current_encrypted_password
```

> **Note:** The application **does not accept the plain-text password** for API authentication. Instead, it requires the **encrypted password** generated by the web application during login.

---

# Running Use Case 2

Execute the API automation using:

```bash
npx playwright test tests/usecase2.spec.js
```

---

# Features Implemented

The following functionalities have been implemented for **Use Case 2**:

- ✅ Authentication using REST API
- ✅ Authentication token capture
- ✅ Reusable API helper methods
- ✅ Externalized configuration
- ✅ Request payload maintained separately in fixtures
- ✅ Dynamic Learning Instance name generation for every execution
- ✅ HTTP status code validation
- ✅ Response body validation
- ✅ Modular project structure
- ✅ No modifications made to the existing UI automation framework

---

# Current Limitation

The application requires an **encrypted password** instead of the user's actual password while authenticating through the API.

The encrypted password is generated dynamically by the application's frontend during every login session. As a result:

- The encrypted password changes every time the user logs in.
- A previously captured encrypted password eventually becomes invalid.
- Before executing the API automation, the latest encrypted password must be obtained from the browser's **Network** tab during a successful login and updated in the `.env` file.

This behavior is specific to the application's authentication mechanism and is outside the Playwright framework itself.

---

# Future Scope / Proposed Automation Enhancement

A more robust automation approach would eliminate the need to manually update the encrypted password before every execution.

This can be achieved by automating the complete authentication flow, for example:

- Automate the browser login using Playwright UI automation.
- Capture the dynamically generated encrypted password or authentication token during the login process.
- Use the captured authentication details directly for subsequent API requests.
- Continue with the Learning Instance API workflow without any manual intervention.

This approach would make the API automation completely dynamic and independent of manually updating encrypted credentials, resulting in a fully automated end-to-end authentication and API execution process.

---

# Assignment Requirements Covered

The following assignment objectives have been addressed:

- ✅ Authenticate via API and capture authentication token.
- ✅ Identify the Learning Instance API endpoint using the browser Network tab.
- ✅ Create a Learning Instance through the API.
- ✅ Validate HTTP response status.
- ✅ Validate response body fields.
- ✅ Maintain reusable API methods.
- ✅ Keep configuration externalized.
- ✅ Preserve the existing UI automation framework without modification.

> **Note:** Functional validation of the created Learning Instance (retrieval through a subsequent GET API) has been kept as a future enhancement, as the corresponding endpoint was outside the current implementation scope.