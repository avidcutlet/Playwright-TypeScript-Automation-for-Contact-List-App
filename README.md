# Contact List Playwright Typescript Automation

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)
- [Parallel Execution Configuration](#parallel-execution-configuration)
- [Firefox and WebKit Screen Size Configuration](#firefox-and-webkit-screen-size-configuration)
- [Reporting and Logs](#reporting-and-logs)
- [Exclude Test Tags in Production Environment](#exclude-test-tags-in-production-environment)

## Introduction
This is an automation project using Playwright with TypeScript for testing the Contact List Website.

## Features
- Cross-browser support (Chromium, Firefox, WebKit, Edge)
- UI and API testing capabilities
- Page Object Model (POM) implementation
- Screenshot capture on test failure
- Test data management
- Comprehensive reports and logs

## Installation

### Prerequisites
- Node.js and npm
- Visual Studio Code
- Git for Windows

### Verify Installations
```bash
node -v
npm -v
```

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/avidcutlet/Contact_List_Playwright_Typescript_Automation.git
cd Contact_List_Playwright_Typescript_Automation
```

2. Install dependencies:
```bash
npm install
```

### Project Dependencies and Versions

This project uses the following core dependencies:

- `@playwright/test` version: **1.52.0**
- `allure-playwright` version: **3.2.1**
- `allure-js-common` version: **3.2.1**

### Configuration
- Modify `playwright.config.ts` for timeout, retries, and other settings.
- Use `.env` files to manage environment-specific URLs.

## Folder Structure
```
Main Project Folder
├── api                     # API-related files
├── api-tokens              # API tokens or auth logic
├── config                  # Configuration files
├── hooks                   # Lifecycle event hooks
├── log                     # Log files
├── node_modules            # Dependencies
├── pages                   # Page Object Models
├── playwright-report       # Playwright test reports
├── reports                 # Test execution reports
├── test
│   ├── api                 # API test scripts
│   ├── reusable-scripts    # Reusable test functions
│   └── ui                  # UI test scripts
├── test-data               # Test input data
├── test-results            # Raw test results
├── utils                   # Utility functions
├── global-setup.ts         # Global setup file
├── package.json            # Project metadata and scripts
├── package-lock.json       # Dependency versions
├── playwright.config.ts    # Playwright configuration
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## Running Tests

### Set Environment Variable

#### Windows
```bash
SET NODE_ENV=staging
```

#### Mac/Linux
```bash
export NODE_ENV=staging
```

### Run All Tests
```bash
npm run test
```

## Run Specific Tests

### Chromium
```bash
npm run test:chromium:add-new-contact-ui
npm run test:chromium:delete-contact-ui
npm run test:chromium:edit-contact-ui
npm run test:chromium:create-user-account-api
npm run test:chromium:tag-ui
npm run test:chromium:tag-api
npm run test:chromium:tag-all
```

### Firefox
```bash
npm run test:firefox:add-new-contact-ui
npm run test:firefox:delete-contact-ui
npm run test:firefox:edit-contact-ui
npm run test:firefox:create-user-account-api
npm run test:firefox:tag-ui
npm run test:firefox:tag-api
npm run test:firefox:tag-all
```

### Edge
```bash
npm run test:edge:add-new-contact-ui
npm run test:edge:delete-contact-ui
npm run test:edge:edit-contact-ui
npm run test:edge:create-user-account-api
npm run test:edge:tag-ui
npm run test:edge:tag-api
npm run test:edge:tag-all
```

### WebKit
```bash
npm run test:webkit:add-new-contact-ui
npm run test:webkit:delete-contact-ui
npm run test:webkit:edit-contact-ui
npm run test:webkit:create-user-account-api
npm run test:webkit:tag-ui
npm run test:webkit:tag-api
npm run test:webkit:tag-all
```

### All Browsers and All Tags
```bash
npm run test:browser-all:tag-all
```

## Running Tests in UI Mode
To open Playwright’s interactive UI mode:
```bash
npm run test:ui:browser
```

Defined in `package.json`:
```json
"test:ui:browser": "playwright test --ui"
```

Click the ▶️ icon beside the test to run it.

## Parallel Execution Configuration
To run tests in parallel, update the `workers` property in `playwright.config.ts`:
```ts
workers: 6, // Example: run 6 parallel workers
```
Tip: Adjust based on available CPU cores.

## Firefox and WebKit Screen Size Configuration

### Firefox Example
```ts
{
  name: 'firefox',
  use: {
    browserName: 'firefox',
    launchOptions: {
      args: ["--start-fullscreen"],
      slowMo: 1000,
    },
    viewport: { width: 1920, height: 1080 }
  },
}
```

### WebKit Example
```ts
{
  name: 'webkit',
  use: {
    ...devices['Desktop Safari'],
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 1000,
    },
    viewport: {width:1536, height:864}
  },
},
```

## Reporting and Logs

### Allure Report
Generate Allure report:
```bash
npm run generate:allure
```

Defined in `package.json`:
```json
"generate:allure": "allure generate reports/allure-results --single-file --output reports/allure-reports --clean"
```

### Additional Logs and Screenshots
- Logs: `log/` folder
- Screenshots: `reports/Screenshots/` folder

## Exclude Test Tags in Production Environment
To exclude specific tests in the production environment, update `playwright.config.ts` as follows:
```ts
grepInvert: currentEnv === 'prod' ? /@tagToSkipInProd1|@tagToSkipInProd2|@tagToSkipInProd3/ : undefined
```