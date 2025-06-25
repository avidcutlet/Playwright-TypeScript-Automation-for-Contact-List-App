import { defineConfig, devices } from '@playwright/test';
import path from 'path';

if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: `${__dirname}//config//.env.staging` });
} else {
  require("dotenv").config({
    path: `${__dirname}//config//.env.${process.env.NODE_ENV}`,
  });
}

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.@(spec|test).ts',
  
  timeout: 300000,
  expect: {
    timeout: 20000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright', {
    detail: false,
    suiteTitle: false,
    stdout: false,  
    //outputFolder: 'report/allure-results',
    resultsDir: 'reports/allure-results',
  }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Use the base URL loaded from the .env file for all tests
    baseURL: process.env.BASE_URL,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    video:"off",

    launchOptions: {
      headless: false,
      slowMo: 1000,
      args: ['--start-fullscreen'],
    },
  },

  /* Configure projects for major browsers */
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
      viewport: {width:1920, height:1080}
      },
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
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
        viewport: { width: 1536, height: 864 },
        deviceScaleFactor: 1,
      },
    },
  ],

  globalSetup: path.resolve(__dirname, './global-setup.ts'),
});