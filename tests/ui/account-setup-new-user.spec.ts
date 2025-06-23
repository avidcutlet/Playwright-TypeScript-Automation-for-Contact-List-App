import { test, expect } from '@playwright/test';
import { defaultConfig } from '@config/config';
import { LoginPage } from '@pages/LoginPage';
import { ContactListPage } from '@pages/ContactListPage';
import { AddContactPage } from '@pages/AddContactPage';
import { generateContactData } from '@testData/TestDataGenerator';

// Use a describe block to group tests related to a specific feature or component.
// This mirrors your "Feature Name: Contact Management - Add New Contact via UI" 
test.describe('Contact Management - Add New Contact via UI', () => {
   let loginPageInstance: LoginPage;
   let contactListPageInstance: ContactListPage;
   let addContactPageInstance: AddContactPage;

   let contactData: ReturnType<typeof generateContactData>;

    test.beforeEach(async ({ page }) => {
      loginPageInstance = new LoginPage(page);
      contactListPageInstance = new ContactListPage(page);
      addContactPageInstance = new AddContactPage(page);

      // Assign contactData here, so each test gets new, unique data
      contactData = generateContactData();

      /******************************/
      /** Given: User is logged in **/
      await page.goto('/');
      await loginPageInstance.isDomContentLoaded(); // Wait for DOM on initial load
      const loginHeaderTextContent = await loginPageInstance.loginHeaderTextContent();
      await expect(loginHeaderTextContent).toBe('Contact List App');

      // Login to Contact List
      await loginPageInstance.enterEmail(defaultConfig.users.admin.username);
      await loginPageInstance.enterPassword(defaultConfig.users.admin.password);
      await loginPageInstance.clickSubmit();
    });

  // This mirrors your "Scenario Name: @TC17 Add New Contact in UI"
  test('Add New Contact in UI', async ({ page }) => {

    /**********************************************/
    /** When: User is on Add Contact page **/
    // Navigate to the create account page
    await contactListPageInstance.isDomContentLoaded();

    let contactListHeaderTextContent = await contactListPageInstance.contactListHeaderTextContent();
    await expect(contactListHeaderTextContent).toBe('Contact List');

    await contactListPageInstance.clickAddContactButton();

    /**********************************************/
    // And: Fill in the required fields with valid data
    await addContactPageInstance.enterFirstName(contactData.firstName);
    await addContactPageInstance.enterLastName(contactData.lastName);
    await addContactPageInstance.enterBirthdate(contactData.birthdate);
    await addContactPageInstance.enterEmail(contactData.email);
    await addContactPageInstance.enterPhone(contactData.phone);
    await addContactPageInstance.enterStreet1(contactData.street1);
    await addContactPageInstance.enterStreet2(contactData.street2);
    await addContactPageInstance.enterCity(contactData.city);
    await addContactPageInstance.enterStateProvince(contactData.stateProvince);
    await addContactPageInstance.enterPostalCode(contactData.postalCode);
    await addContactPageInstance.enterCountry(contactData.country);

    /**********************************************/
    // And: Click on "Submit"
    await addContactPageInstance.clickSubmit();

    /**********************************************/
    // Then: User should successfully add a new contact

    await contactListPageInstance.isDomContentLoaded();

    contactListHeaderTextContent = await contactListPageInstance.contactListHeaderTextContent();
    await expect(contactListHeaderTextContent).toBe('Contact List');

    // Verify data in a table if immediately visible
    await expect(page.locator(`text=${contactData.firstName} ${contactData.lastName}`)).toBeVisible();
  });
});