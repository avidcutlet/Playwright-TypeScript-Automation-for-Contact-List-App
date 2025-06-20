require('tsconfig-paths/register');

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


// Determine which environment file to load
const environment = process.env.NODE_ENV || 'staging'; // Default to 'staging' if not specified
const dotenvResult = dotenv.config({ path: path.resolve(__dirname, `config/.env.${environment}`) });


// LINES FOR MORE DETAILED DEBUGGING
if (dotenvResult.error) {
    console.error(`[DOTENV ERROR] Failed to load .env file: ${dotenvResult.error.message}`);
} else {
    console.log(`[DOTENV DEBUG] Successfully loaded .env file. Parsed variables:`, dotenvResult.parsed);
}
console.log(`[DEBUG] Loaded BASE_URL from .env: ${process.env.BASE_URL}`);


export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.@(spec|test).ts',

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
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
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Use the base URL loaded from the .env file for all tests
    baseURL: process.env.BASE_URL,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',

    // Set to true for headless mode, false for headed mode
    headless: false, 
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

});