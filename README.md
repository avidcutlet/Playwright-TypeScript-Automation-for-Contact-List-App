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
It offers a complete setup for UI and API testing, cross-browser support, and detailed reporting.  
The framework is scalable and adaptable for both development and production testing needs.

## Features
- Cross-browser support (Chromium, Firefox, WebKit, Edge)
- UI and API testing capabilities
- Page Object Model (POM) implementation
- Screenshot capture on test failure
- Test data management
- Comprehensive reports and logs
- Interactive test debugging with Playwright UI mode

## Installation

### Prerequisites
- Node.js
- npm


### Verify Installations
```bash
node -v
npm -v
```

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/avidcutlet/Contact_List_Playwright_Typescript_Automation.git
```

2. Go to project directory:
```bash
cd Contact_List_Playwright_Typescript_Automation
```

3. Install dependencies:
```bash
npm install @playwright/test@1.52.0 allure-playwright@3.2.1 allure-js-commons@3.2.1 --save-dev 
```

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
├── pages                   # Page Object Models
├── reports                 # Test execution reports
├── test
│   ├── api                 # API test scripts
│   ├── reusable-scripts    # Reusable test functions
│   └── ui                  # UI test scripts
├── test-data               # Test input data
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

## Run Specific Tests File by Browser

To run a specific test spec using chromium, use the following commands:
```bash
npm run test:chromium <path-to-spec-file>
```

To run a specific test spec using firefox, use the following commands:
```bash
npm run test:firefox <path-to-spec-file>
```

To run a specific test spec using edge, use the following commands:
```bash
npm run test:edge <path-to-spec-file>
```

To run a specific test spec using webkit, use the following commands:
```bash
npm run test:webkit <path-to-spec-file>
```

#### List of path-to-spec-file:
```bash
/api/create-contact-api.spec.ts
```
```bash
/api/create-user-account-api.spec.ts
```
```bash
/ui/add-new-contact-ui.spec.ts
```
```bash
/ui/delete-contact-ui.spec.ts
```
```bash
/ui/edit-contact-ui.spec.ts
```


### Run Specific Tag File by Browser
To run a specific tag using chromium, use the following commands:
```bash
npm run test:chromium:tag <tag>
```

To run a specific tag using firefox, use the following commands:
```bash
npm run test:firefox:tag <tag>
```

To run a specific tag using edge, use the following commands:
```bash
npm run test:edge:tag <tag>
```

To run a specific tag using webkit, use the following commands:
```bash
npm run test:webkit:tag <tag>
```

List of specific tags:
```bash
@Regression
```
```bash
@ALL
```
```bash
@API
```
```bash
@UI
```
```bash
@UIUserCreation
```
```bash
@UIContactCreation
```
```bash
@UIContactDeletion
```
```bash
@APIUserCreation
```
```bash
@APIContactCreation
```

```bash
@APIInvalidContactCreation
```

### All Browsers and Specific Tag
```bash
npm run test:browser-all:tag
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
grepInvert: currentEnv === 'prod' ? /@tagToSkipInProd1|@tagToSkipInProd2|@tagToSkipInProd3/
```