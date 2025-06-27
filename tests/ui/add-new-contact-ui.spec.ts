import { label, LabelName, displayName, feature } from 'allure-js-commons';

import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { AddContactPage } from '@pages/add-contact-page';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';

const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

// Contact Management - Add new contact in UI TC
test.describe('Contact Management - Add New Contact via UI @ALL @UI @CreateUserAccount @tagToSkipInProd3', () => {

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
    const reusableScripts = new ReusableHelpers(page);

    const loginPageHeader: string = datasetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = datasetUI.getTestData('Header', 'SignUpPageHeader');
    const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
    
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    await expect(loginPageHeaderTxt).toBe(loginPageHeader);
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      const signUpPageHeaderTxt = await signUpPageHeaderResult.textContent();
      await expect(signUpPageHeaderTxt).toBe(signUpPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await reusableScripts.enterSignUpCredentials(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify New User Added Successfully', async () => {
      const contactListPageHeaderResult = await contactListPageInstance.verifyContactListHeader();
      const contactListPageHeaderTxt = await contactListPageHeaderResult.textContent();
      await expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
    });
  });
    
  test('Add New Contact in UI @TC17', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Addition");
    await displayName(`Add New Contact - Success`);
    await feature("UI");

    const contactListPageInstance = new ContactListPage(page);
    const addContactPageInstance = new AddContactPage(page);
    const reusableScripts = new ReusableHelpers(page);

    const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
    const addContactPageHeader: string = datasetUI.getTestData('Header', 'AddContactPageHeader');
    
    const signUpResult = await reusableScripts.signUpAndVerify(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    
    await attach.withAllureStep(page, 'Step 1 - Verify Contact List Page', async () => {
      const contactListPageHeaderTxt = await signUpResult.textContent()
      await expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
    });

    await attach.withAllureStep(page, 'Step 2 - Click Add Contact Button', async () => {
      await contactListPageInstance.clickAddContact();
    });
    
    await attach.withAllureStep(page, 'Step 3 - Verify Add Contact Page', async () => {
      const addContactPageHeaderLocator = await addContactPageInstance.verifyAddContactHeader();
      const addContactPageHeaderTxt = await addContactPageHeaderLocator.textContent();
      await expect(addContactPageHeaderTxt).toBe(addContactPageHeader);
    });

    // And: Fill in the required fields with valid data
    await attach.withAllureStep(page, 'Step 4 - Fill in Credentials for New Contact', async () => {
      await reusableScripts.enterAddContactCredentials(
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

    await attach.withAllureStep(page, 'Step 5 - Click Submit Button', async () => {
      await addContactPageInstance.clickSubmit();
    });
    
    const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
    const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
    await expect(contactListPageHeaderTxt).toBe(contactListPageHeader);

    // Verify data in a table if immediately visible
    await attach.withAllureStep(page, 'Step 6 - Verify Added Contact', async () => {
      await expect(page.locator(`text=${fakerData.firstName} ${fakerData.lastName}`)).toBeVisible();
    });
  });
});