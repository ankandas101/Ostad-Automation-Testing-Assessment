# SauceDemo UI Automation Testing with Playwright

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![POM](https://img.shields.io/badge/Design-Page%20Object%20Model-blue)
![Allure](https://img.shields.io/badge/Report-Allure-orange)
![Status](https://img.shields.io/badge/Assignment-Completed-success)

## 📌 Project Overview

This repository contains an end-to-end UI automation testing solution for the **SauceDemo** application using **Playwright** with **JavaScript**.


### 👨‍💻 Author

**Ankan Das**

- 📧 Email: hello@ankandas.me  🌐 Portfolio: https://ankandas.me

---

### Application Under Test

https://www.saucedemo.com/

---

# Assignment Scenarios

## ✅ Q1 – Locked User Login Validation

- Login using `locked_out_user`
- Verify the locked user error message while login

## ✅ Q2 – Standard User Purchase Flow

- Login with `standard_user`
- Reset App State
- Add any three products to the cart
- Fill checkout information using Faker generated data
- Verify product names
- Verify total price
- Complete purchase
- Verify successful order message
- Reset App State
- Logout

## ✅ Q3 – Performance Glitch User Purchase Flow

- Login with `performance_glitch_user`
- Reset App State
- Sort products by **Name (Z → A)**
- Add the first product
- Navigate through checkout
- Verify product name
- Verify total price
- Complete purchase
- Verify successful order message
- Reset App State
- Logout

> **Note**
>
> `performance_glitch_user` intentionally simulates a slow application. Therefore, use use increased timeout (90 Second) while relying on Playwright's auto-waiting mechanisms for only this scenario, if it shows timeout error please increase this value .

---

# ✅ Requirement Coverage

| Requirement | Status |
|-------------|:------:|
| Locked user login validation | ✅ |
| Standard user purchase flow | ✅ |
| Performance glitch user purchase flow | ✅ |
| Individual execution | ✅ |
| Sequential execution | ✅ |
| HTML Report | ✅ |
| Allure Report | ✅ |

---

# 🚀 Tech Stack

- Playwright
- JavaScript (ES6)
- Node.js
- Faker.js
- Allure Report
- Playwright HTML Report

---

# 📁 Project Structure

```text
project-root/
│
├── fixtures/
│   ├── testData.js
│   └── users.js
│
├── pageObjects/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutInformationPage.js
│   ├── CheckoutOverviewPage.js
│   └── CheckoutCompletePage.js
│
├── tests/
│   ├── q1-locked-user.spec.js
│   ├── q2-standard-user.spec.js
│   └── q3-performance-user.spec.js
│
├── playwright-report/
├── allure-results/
├── playwright.config.js
├── package.json
└── README.md
```

---

# 📦 Installation

```bash
git clone https://github.com/ankandas101/Ostad-Automation-Testing-Assessment

cd Ostad-Automation-Testing-Assessment

npm install

npx playwright install
```
# 📋 Prerequisites

Before running the project, make sure the following are installed:

- Node.js (v18+ , v 24 recomended)
- npm
- Git

> **Optional:** Install Allure CLI if you want to generate Allure reports locally.

```bash
npm install -g allure-commandline
```
---
# ▶ Running Tests

## Run All Test Scenarios

Using npm:

```bash
npm test
```

Or using Playwright directly:

```bash
npx playwright test
```

---

## Run Individual Test Scenarios

### Q1 - Locked User Login Validation

Using npm:

```bash
npm run q1
```

Or:

```bash
npx playwright test tests/q1-locked-user.spec.js
```

---

### Q2 - Standard User Purchase Flow

Using npm:

```bash
npm run q2
```

Or:

```bash
npx playwright test tests/q2-standard-user.spec.js
```

---

### Q3 - Performance Glitch User Purchase Flow

Using npm:

```bash
npm run q3
```

Or:

```bash
npx playwright test tests/q3-performance-user.spec.js
```

---

# 🔄 Sequential Execution

All three scenarios can be executed sequentially using:

```bash
npm test
```

or

```bash
npx playwright test
```

Execution Order:

```text
Q1 → Q2 → Q3
```

---

# 📊 Reports

---
## 📈 Live Allure Report

The latest Allure Report is automatically generated and published after every GitHub Actions workflow execution.

👉 https://ankandas101.github.io/Ostad-Automation-Testing-Assessment 


## Playwright HTML Report

Using npm:

```bash
npm run report
```

Or:

```bash
npx playwright show-report
```

---

## Allure Report

Generate and open the report:

```bash
npm run allure
```

Or manually:

```bash
allure generate allure-results --clean
allure open
```

---

# 📋 Available Commands

| Command | Description |
|----------|-------------|
| `npm test` | Run all test scenarios sequentially |
| `npx playwright test` | Run all test scenarios sequentially |
| `npm run q1` | Run Q1 - Locked User Login Validation |
| `npm run q2` | Run Q2 - Standard User Purchase Flow |
| `npm run q3` | Run Q3 - Performance Glitch User Purchase Flow |
| `npm run report` | Open Playwright HTML Report |
| `npm run allure` | Generate and open Allure Report |

---

# 🔄 Sequential Execution

```text
Q1
↓

Q2
↓

Q3
```

Run:

```bash
npm test
```

---

# 📊 HTML Report

```bash
npx playwright show-report
```

---

# 📈 Allure Report

Generate:

```bash
allure generate allure-results --clean
```

Open:

```bash
allure open
```

---

# 🧪 Test Data

## Static Product Data

```javascript
export const testProducts = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt"
];
```

## Dynamic Checkout Data

```javascript
import { faker } from "@faker-js/faker";

export function generateDeliveryInfo() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
}
```

---

# ✅ Assertions

The framework verifies:

- Login validation
- Error messages
- Product names
- Cart badge
- Checkout summary
- Total price
- Order confirmation
- Logout

---

# ⚡ Auto Waiting Strategy

This framework avoids unnecessary hard waits (`waitForTimeout`) and relies on Playwright's built-in auto-waiting.

Examples:

```javascript
await expect(page).toHaveURL(...);
await expect(locator).toBeVisible();
await expect(locator).toHaveText(...);
```

---

# 🚦 Performance Scenario

Only the **performance_glitch_user** scenario uses an increased timeout because SauceDemo intentionally simulates slow application behavior.

---



# 📷 Screenshots

## Allure Report
<img width="1919" height="1009" alt="allure report" src="https://github.com/user-attachments/assets/0caf6ef2-4d2c-433e-84fc-ca43f064a289" />


## HTML Report

<img width="1392" height="851" alt="html report" src="https://github.com/user-attachments/assets/74d30693-f72d-4ab1-9513-5213a121ebb8" />

---

# 🎥 Video Demonstration

updating soon

---


# 📄 License

This project was developed as part of a UI Automation Testing assignment for OSTAD SQA course evaluation purposes.
