import { test, expect } from '@playwright/test';
// import { defaultConfig } from '../../config/config'; // Import your config utility
import { defaultConfig } from '@config/config'; // Import your config utility


// Use a describe block to group tests related to a specific feature or component.
// This mirrors your "Feature Name: Account Setup - New User Account via UI"
test.describe('Account Setup - New User Account via UI', () => {

  // Each 'test' block represents a scenario.
  // This mirrors your "Scenario Name: Create User Account in UI"
  test('Create User Account in UI', async ({ page }) => {

    // Login page locators
    const EMAIL_TXT = page.locator('#email');
    const PASSWORD_TXT = page.locator('#password');
    const SUBMIT_BTN = page.locator('#submit');
    const ADD_NEW_CONTACT_BTN = page.locator('#add-contact');

    // Add new contact locators
    const FIRSTNAME_TXT = page.locator("#firstName");
    const LASTNAME_TXT = page.locator("#lastName");
    const BIRTHDATE_TXT = page.locator("#birthdate");
    // const EMAIL_TXT = page.locator("#email");
    const PHONE_TXT = page.locator("#phone");
    const STREET1_TXT = page.locator("#street1");
    const STREET2_TXT = page.locator("#street2");
    const CITY_TXT = page.locator("#city");
    const STATEPROVINCE_TXT = page.locator("#stateProvince");
    const POSTALCODE_TXT = page.locator("#postalCode");
    const COUNTRY_TXT = page.locator("#country");
    
    // const SUBMIT_BTN = page.locator("#submit");
    const CANCEL_BTN = page.locator("#cancel");

    /******************************/
    /** Given: User is logged in **/
    // You might have a beforeEach hook for common login steps, or include it here if specific to this test.
    await page.goto('/');

    // Expect a title to contain "Contact List App".
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(/Contact List App/);
    await expect(page).toHaveTitle(/Contact List App/);

    // Login to contact list
    await EMAIL_TXT.fill(defaultConfig.users.admin.username);
    await PASSWORD_TXT.fill(defaultConfig.users.admin.password);
    await SUBMIT_BTN.click();

    /**********************************************/
    /** When: User is on create new account page **/
    // Navigate to the create account page
    await expect(page.locator('#add-contact')).toBeVisible();
    await ADD_NEW_CONTACT_BTN.click();
    await expect(page).toHaveTitle(/Add Contact/); 
    await expect(page.locator('h1')).toHaveText(/Add Contact/);

    /**********************************************/
    // And: Populate required fields with valid data
    await FIRSTNAME_TXT.fill('Jimmy');
    await LASTNAME_TXT.fill('Neutron');
    await BIRTHDATE_TXT.fill('1990-05-12');
    await EMAIL_TXT.fill('jimmyNeutron@Ranches.com');
    await PHONE_TXT.fill('0000111');
    await STREET1_TXT.fill('Ranches');
    await STREET2_TXT.fill('Fictional');
    await CITY_TXT.fill('Retroville');
    await STATEPROVINCE_TXT.fill('Texas');
    await POSTALCODE_TXT.fill('214');
    await COUNTRY_TXT.fill('United States');

    /**********************************************/
    // And: Click on submit button
    await SUBMIT_BTN.click();

    /**********************************************/
    // Then User should successfully create new account
    // Verify success by checking:
    // 1. URL change:
    await expect(page).toHaveURL(/contactList/); // Or a dashboard/profile page


    // 4. (Optional) Verify data in a table/list if immediately visible, or navigate to it
    await expect(page.locator('text=Jimmy Neutron')).toBeVisible();
  });

  // You can add more 'test' blocks for other scenarios related to "Account Setup - New User Account via UI"
  // test('Attempt to create account with existing email', async ({ page }) => {
  //   // ... test steps for this scenario
  // });

});