import path from 'path';

import { defineConfig, devices } from '@playwright/test';

let currentEnv = process.env.NODE_ENV;
if (currentEnv === "staging" || currentEnv === "dev" || currentEnv === "prod") {
  require("dotenv").config({ path: `${__dirname}//config//.env.${currentEnv}`, });
} else {
  require("dotenv").config({ path: `${__dirname}//config//.env.staging` });
}

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.@(spec|test).ts',
  
  timeout: 400000,
  expect: {
    timeout: 20000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['allure-playwright', {
    detail: false,
    suiteTitle: false,
    stdout: false,  
    resultsDir: 'reports/allure-results',
  }]],

  ...(currentEnv === 'prod' && { grepInvert: /@tagToSkipInProd1|@tagToSkipInProd2|@tagToSkipInProd3/ }),

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    video:"off",

    launchOptions: {
      headless: false,
      slowMo: 1000,
      args: ['--start-fullscreen'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        headless: false,
        launchOptions:{
          args: ["--start-maximized"],
          slowMo: 1000
        },
      viewport: null
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        headless: false,
        launchOptions:{
          args: ["--start-fullscreen"],
          slowMo: 1000,
        },
      viewport: {width:1536, height:864}
      },
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000,
        },
        viewport: null
      },
    },
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
  ],
  globalSetup: path.resolve(__dirname, './global-setup.ts'),
});