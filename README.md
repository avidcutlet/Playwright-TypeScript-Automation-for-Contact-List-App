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
- Code generation using `codegen` utility
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
npm install 
```

### Configuration
- Modify `playwright.config.ts` for timeout, retries, and other settings.
- Use `.env` files to manage environment-specific URLs.

## Folder Structure
```
Main Project Folder
├── api                     # API Setup related files
├── api-tokens              # API tokens or auth logic
├── config                  # Environment and Configuration (ex. Base URL and Enabling Screenshot)
├── hooks                   # Web-Hooks (Initialize and Teardown)
├── log                     # Log Files for test execution
├── pages                   # Page Object Models
├── reports                 # Allure-report, allure-results and screenshots are saved
├── test
│   ├── api                 # API test scripts
│   ├── reusable-scripts    # Reusable test functions
│   └── ui                  # UI test scripts
├── test-data               # Test Data for execution 
├── utils                   # Utilities function (logging text file, take screenshot, reporter utils and etc.)
├── global-setup.ts         # Setup for creating a screenshot folder for every execution
├── package.json            # Project metadata and scripts
├── package-lock.json       # Dependency versions
├── playwright.config.ts    # Playwright configuration (Browsers to test against, Test timeout settings, etc.)
├── README.md               # Project documentation
└── tsconfig.json           # Configuration file for TypeScript. (Compiler options, Files to include/exclude, etc.)
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
npm run test:chromium /api/create-contact-api.spec.ts
```

To run a specific test spec using firefox, use the following commands:
```bash
npm run test:firefox /api/create-user-account-api.spec.ts
```

To run a specific test spec using edge, use the following commands:
```bash
npm run test:edge /ui/add-new-contact-ui.spec.ts
```

To run a specific test spec using webkit, use the following commands:
```bash
npm run test:webkit /ui/delete-contact-ui.spec.ts
```

### Run Specific Tag File by Browser
To run a specific tag using chromium, use the following commands:
```bash
npm run test:chromium:tag @ALL
```

To run a specific tag using firefox, use the following commands:
```bash
npm run test:firefox:tag @ALL
```

To run a specific tag using edge, use the following commands:
```bash
npm run test:edge:tag @ALL
```

To run a specific tag using webkit, use the following commands:
```bash
npm run test:webkit:tag @ALL
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