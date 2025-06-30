import { test, expect, Page } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { AddContactPage } from '@pages/add-contact-page';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Contact Management - Add New Contact via UI @Regression @ALL @UI @tagToSkipInProd3', () => {


  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Add New Contact via UI");
  });
  
  test('Add New User in UI @UIUserCreation', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful User Addition");
    await displayName(`Add New User - Success`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = dataSetUI.getTestData('Header', 'SignUpPageHeader');
    const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
    
    const fakerData = generateContactData();
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      expect(loginPageHeaderTxt).toBe(loginPageHeader);
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      const signUpPageHeaderTxt = await signUpPageHeaderResult.textContent();
      expect(signUpPageHeaderTxt).toBe(signUpPageHeader);
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
      expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
    });
  });
    
  test('Add New Contact in UI @UIContactCreation', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Addition");
    await displayName(`Add New Contact - Success`);
    await feature("UI");

    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const addContactPageInstance = new AddContactPage(page);
    const reusableScripts = new ReusableHelpers(page);

    const fakerData = generateContactData();
    const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
    const addContactPageHeader: string = dataSetUI.getTestData('Header', 'AddContactPageHeader');
    
    await loginPageInstance.clickSignUp();
    await reusableScripts.enterSignUpCredentials(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    
    await attach.withAllureStep(page, 'Step 1 - Verify Contact List Page', async () => {
      await loginPageInstance.clickSubmit();
      const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
      const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
      expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
    });

    await attach.withAllureStep(page, 'Step 2 - Click Add Contact Button', async () => {
      await contactListPageInstance.clickAddContact();
    });
    
    await attach.withAllureStep(page, 'Step 3 - Verify Add Contact Page', async () => {
      const addContactPageHeaderLocator = await addContactPageInstance.verifyAddContactHeader();
      const addContactPageHeaderTxt = await addContactPageHeaderLocator.textContent();
      expect(addContactPageHeaderTxt).toBe(addContactPageHeader);
    });

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
    
    await attach.withAllureStep(page, 'Step 6 - Verify Added Contact', async () => {
      expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
      expect(page.getByText(`${fakerData.firstName} ${fakerData.lastName}`)).toBeVisible();
    });
  });
});
