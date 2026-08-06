# 🧪 SauceDemo UI Automation Testing with Playwright

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![POM](https://img.shields.io/badge/Design-Page%20Object%20Model-blue)
![Allure](https://img.shields.io/badge/Report-Allure-orange)
![Status](https://img.shields.io/badge/Assignment-Completed-success)

## 📌 Project Overview

This repository contains an end-to-end UI automation testing solution for the **SauceDemo** application using **Playwright** with **JavaScript**.

### Application Under Test

https://www.saucedemo.com/

---

# Assignment Scenarios

## ✅ Q1 – Locked User Login Validation

- Login using `locked_out_user`
- Verify the locked user error message

## ✅ Q2 – Standard User Purchase Flow

- Login with `standard_user`
- Reset App State
- Add any three products to the cart
- Proceed to checkout
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
- Verify product name(s)
- Verify total price
- Complete purchase
- Verify successful order message
- Reset App State
- Logout

> **Note**
>
> `performance_glitch_user` intentionally simulates a slow application. Therefore, only this scenario uses an increased timeout while relying on Playwright's auto-waiting mechanisms.

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
├── screenshots/
├── videos/
├── playwright-report/
├── allure-results/
├── playwright.config.js
├── package.json
└── README.md
```

---

# 📦 Installation

```bash
git clone <repository-url>

cd <project-folder>

npm install

npx playwright install
```

---

# ▶ Running Tests

## Run all scenarios

```bash
npm test
```

or

```bash
npx playwright test
```

## Run individual scenarios

### Q1

```bash
npm run q1
```

### Q2

```bash
npm run q2
```

### Q3

```bash
npm run q3
```

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

# 💡 Best Practices

- Page Object Model (POM)
- Reusable Base Page
- Dynamic Test Data
- Faker Integration
- Auto Waiting
- Dynamic Product Verification
- Dynamic Price Verification
- HTML Report
- Allure Report

---

# 📷 Screenshots

## HTML Report

_Add screenshot here._

## Allure Report

_Add screenshot here._

## Project Structure

_Add screenshot here._

---

# 🎥 Video Demonstration

Add your YouTube or Google Drive walkthrough link here.

---

# 👨‍💻 Author

**Ankan Das**

- 📧 Email: hello@ankandas.me
- 🌐 Portfolio: https://ankandas.me

---

# 📄 License

This project was developed as part of a UI Automation Testing assignment for educational and evaluation purposes.
