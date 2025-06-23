import { test, expect } from '@playwright/test';
import { config, EnvironmentConfig } from '../../config'; // Import your config utility

test('basic test navigates to contact list page', async ({ page }) => {
  const email = page.locator('#email');
  const password = page.locator('#password');
  const submit = page.locator('#submit');

  await page.goto(config.baseUrl);

  // Expect a title to contain "Contact List App".
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText(/Contact List App/);
  await expect(page).toHaveTitle(/Contact List App/);

  // Login to contact list
  await email.fill(config.users.admin.username);
  await password.fill(config.users.admin.password);
  await submit.click();

  // Assert if the user logged in
  // Expect an h1 tag to contain "Contact List".
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText(/Contact List/);
  await expect(page).toHaveTitle(/Contact List/);
});