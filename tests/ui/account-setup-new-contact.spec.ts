import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { generateContactData } from '@testData/test-data-generator';

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
      // hooks
      await page.goto('/');
      const loginHeaderTextContent = await loginPageInstance.loginHeaderTextContent();
      await expect(loginHeaderTextContent).toBe('Contact List App');

      // Login to Contact List
      // json file for test data
      await loginPageInstance.enterEmail(process.env.ADMIN_USERNAME! || "not working");
      await loginPageInstance.enterPassword(process.env.ADMIN_PASSWORD! || "not working");
      await loginPageInstance.clickSubmit();
    });

  // This mirrors your "Scenario Name: @TC17 Add New Contact in UI"
  test('Add New Contact in UI', async ({ page }) => {

    /**********************************************/
    /** When: User is on Add Contact page **/
    // Navigate to the create account page
    // start reusable scripts
    let contactListHeaderTextContent = await contactListPageInstance.contactListHeaderTextContent();
    await expect(contactListHeaderTextContent).toBe('Contact List');

    await contactListPageInstance.clickAddContactButton();
    
    let addContactHeaderTextContent = await addContactPageInstance.addContactHeaderTextContent();
    await expect(addContactHeaderTextContent).toBe('Add Contact');


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
    // end reusable scripts

    /**********************************************/
    // Then: User should successfully add a new contact

    //retain
    contactListHeaderTextContent = await contactListPageInstance.contactListHeaderTextContent();
    await expect(contactListHeaderTextContent).toBe('Contact List');

    // Verify data in a table if immediately visible
    await expect(page.locator(`text=${contactData.firstName} ${contactData.lastName}`)).toBeVisible();
  });
});