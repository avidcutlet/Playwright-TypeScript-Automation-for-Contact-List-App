import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { SignUpPage } from '@pages/sign-up-page';
import { generateContactData } from '@testData/test-data-generator';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';

import { initializeTestHooks } from '@hooks/web-hook';
import { label, LabelName, displayName, feature } from 'allure-js-commons';
import AllureAttachScreenshot from '@utils/allure-report-util';

const ATTACH = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Contact Management - Add New Contact via UI @ALL @UI @CreateUserAccount', () => {

  let fakerData: ReturnType<typeof generateContactData>;

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Add New Contact via UI");

    fakerData = generateContactData();
  });
  
  test('Add New User in UI @TC8', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful User Addition");
    await displayName(`Add New User - Success`);
    await feature("UI");

    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const REUSABLE_SCRIPTS = new ReusableHelpers(page);
    
    // Verify Login Page
    const loginHeaderTextContent = await loginPageInstance.verifyLoginHeader();
    await expect(loginHeaderTextContent).toBe('Contact List App');
    
    // Sign Up to Contact List
    await ATTACH.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      await loginPageInstance.clickSignUp();
    });
    
    await ATTACH.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const addUserHeaderTextContent = await addUserPageInstance.verifyAddUserHeader();
      await expect(addUserHeaderTextContent).toBe('Add User');
    });
    
    await ATTACH.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await REUSABLE_SCRIPTS.enterSignUpCredentials(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );
    });
    
    await ATTACH.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await ATTACH.withAllureStep(page, 'Step 5 - Verify New User Added Successfully', async () => {
      const contactListHeader = await contactListPageInstance.verifyContactListHeader();
      await expect(contactListHeader).toBe('Contact List');
    });
  });
    
  test('Add New Contact in UI @TC17', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Addition");
    await displayName(`Add New Contact - Success`);
    await feature("UI");

    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const addContactPageInstance = new AddContactPage(page);
    const REUSABLE_SCRIPTS = new ReusableHelpers(page);

    // Verify Login Page
    const loginHeaderTextContent = await loginPageInstance.verifyLoginHeader();
    await expect(loginHeaderTextContent).toBe('Contact List App');

    await loginPageInstance.clickSignUp();
    
    const addUserHeaderTextContent = await addUserPageInstance.verifyAddUserHeader();
    await expect(addUserHeaderTextContent).toBe('Add User');
    
    await REUSABLE_SCRIPTS.enterSignUpCredentials(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    
    await addUserPageInstance.clickSubmit();

    await ATTACH.withAllureStep(page, 'Step 1 - Verify Contact List Page', async () => {
      const contactListHeader = await contactListPageInstance.verifyContactListHeader();
      await expect(contactListHeader).toBe('Contact List');
    });

    await ATTACH.withAllureStep(page, 'Step 2 - Click Add Contact Button', async () => {
      await contactListPageInstance.clickAddContactButton();
    });
    
    await ATTACH.withAllureStep(page, 'Step 3 - Verify Add Contact Page', async () => {
      const addContactHeader = await addContactPageInstance.verifyAddContactHeader();
      await expect(addContactHeader).toBe('Add Contact');
    });

    // And: Fill in the required fields with valid data
    await ATTACH.withAllureStep(page, 'Step 4 - Fill in Credentials for New Contact', async () => {
      await REUSABLE_SCRIPTS.enterAddContactCredentials(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.birthdate,
        fakerData.phone,
        fakerData.street1,
        fakerData.street2,
        fakerData.city,
        fakerData.stateProvince,
        fakerData.postalCode,
        fakerData.country
      );
    });

    await ATTACH.withAllureStep(page, 'Step 5 - Click Submit Button', async () => {
      await addContactPageInstance.clickSubmit();
    });
    
    const contactListHeader = await contactListPageInstance.verifyContactListHeader();
    await expect(contactListHeader).toBe('Contact List');

    // Verify data in a table if immediately visible
    await ATTACH.withAllureStep(page, 'Step 6 - Verify Added Contact', async () => {
      await expect(page.locator(`text=${fakerData.firstName} ${fakerData.lastName}`)).toBeVisible();
    });
  });
});