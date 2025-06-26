import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { SignUpPage } from '@pages/sign-up-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { initializeTestHooks } from '@hooks/web-hook';

import { label, LabelName, displayName, feature } from 'allure-js-commons';
import { generateContactData } from '@testData/test-data-generator';
import DatasetUtil from '@utils/test-data-util';
import AllureAttachScreenshot from '@utils/allure-report-util';

const DATASET_UI = new DatasetUtil('ui');
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

    const LOGIN_PAGE_INSTANCE = new LoginPage(page);
    const CONTACT_LIST_PAGE_INSTANCE = new ContactListPage(page);
    const ADD_USER_PAGE_INSTANCE = new SignUpPage(page);
    const REUSABLE_SCRIPTS = new ReusableHelpers(page);

    const LOGIN_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'LoginPageHeader');
    const SIGN_UP_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'SignUpPageHeader');
    const CONTACT_LIST_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'ContactListPageHeader');
    
    // Verify Login Page
    const LOGIN_PAGE_HEADER_RESULT= await LOGIN_PAGE_INSTANCE.verifyLoginHeader();
    const LOGIN_PAGE_HEADER_TXT = await LOGIN_PAGE_HEADER_RESULT.textContent();
    await expect(LOGIN_PAGE_HEADER_TXT).toBe(LOGIN_PAGE_HEADER);
    
    // Sign Up to Contact List
    await ATTACH.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      await LOGIN_PAGE_INSTANCE.clickSignUp();
    });
    
    await ATTACH.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const SIGN_UP_PAGE_HEADER_RESULT = await ADD_USER_PAGE_INSTANCE.verifyAddUserHeader();
      const SIGN_UP_PAGE_HEADER_TXT = await SIGN_UP_PAGE_HEADER_RESULT.textContent();
      await expect(SIGN_UP_PAGE_HEADER_TXT).toBe(SIGN_UP_PAGE_HEADER);
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
      await ADD_USER_PAGE_INSTANCE.clickSubmit();
    });
    
    await ATTACH.withAllureStep(page, 'Step 5 - Verify New User Added Successfully', async () => {
      const CONTACT_LIST_PAGE_HEADER_RESULT = await CONTACT_LIST_PAGE_INSTANCE.verifyContactListHeader();
      const CONTACT_LIST_PAGE_HEADER_TXT = await CONTACT_LIST_PAGE_HEADER_RESULT.textContent();
      await expect(CONTACT_LIST_PAGE_HEADER_TXT).toBe(CONTACT_LIST_PAGE_HEADER);
    });
  });
    
  test('Add New Contact in UI @TC17', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Addition");
    await displayName(`Add New Contact - Success`);
    await feature("UI");

    const LOGIN_PAGE_INSTANCE = new LoginPage(page);
    const ADD_USER_PAGE_INSTANCE = new SignUpPage(page);
    const CONTACT_LIST_PAGE_INSTANCE = new ContactListPage(page);
    const ADD_CONTACT_PAGE_INSTANCE = new AddContactPage(page);
    const REUSABLE_SCRIPTS = new ReusableHelpers(page);

    const LOGIN_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'LoginPageHeader');
    const SIGN_UP_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'SignUpPageHeader');
    const CONTACT_LIST_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'ContactListPageHeader');
    const ADD_CONTACT_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'AddContactPageHeader');

    // Verify Login Page

    
    const SIGN_UP_RESULT = await REUSABLE_SCRIPTS.signUpAndVerify(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    
    await ATTACH.withAllureStep(page, 'Step 1 - Verify Contact List Page', async () => {
      const CONTACT_LIST_PAGE_HEADER_TXT = await SIGN_UP_RESULT.textContent()
      await expect(CONTACT_LIST_PAGE_HEADER_TXT).toBe(CONTACT_LIST_PAGE_HEADER);
    });

    await ATTACH.withAllureStep(page, 'Step 2 - Click Add Contact Button', async () => {
      await CONTACT_LIST_PAGE_INSTANCE.clickAddContactButton();
    });
    
    await ATTACH.withAllureStep(page, 'Step 3 - Verify Add Contact Page', async () => {
      const ADD_CONTACT_PAGE_HEADER_LOCATOR = await ADD_CONTACT_PAGE_INSTANCE.verifyAddContactHeader();
      const ADD_CONTACT_PAGE_HEADER_TXT = await ADD_CONTACT_PAGE_HEADER_LOCATOR.textContent();
      await expect(ADD_CONTACT_PAGE_HEADER_TXT).toBe(ADD_CONTACT_PAGE_HEADER);
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
      await ADD_CONTACT_PAGE_INSTANCE.clickSubmit();
    });
    
    const CONTACT_LIST_PAGE_HEADER_LOCATOR = await CONTACT_LIST_PAGE_INSTANCE.verifyContactListHeader();
    const CONTACT_LIST_PAGE_HEADER_TXT = await CONTACT_LIST_PAGE_HEADER_LOCATOR.textContent();
    await expect(CONTACT_LIST_PAGE_HEADER_TXT).toBe(CONTACT_LIST_PAGE_HEADER);

    // Verify data in a table if immediately visible
    await ATTACH.withAllureStep(page, 'Step 6 - Verify Added Contact', async () => {
      await expect(page.locator(`text=${fakerData.firstName} ${fakerData.lastName}`)).toBeVisible();
    });
  });
});