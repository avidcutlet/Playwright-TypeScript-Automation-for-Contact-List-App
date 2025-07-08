import { test, expect, Page } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Registration functionality via UI @Regression @ALL @UI @TS1 @UserRegistration @tagToSkipInProd3', () => {

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Add New Contact via UI");
  });
  
  test('Verify successful user registration in UI @TC1', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful User Registration");
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
      expect(signUpPageHeaderResult).toBe(signUpPageHeader);
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
      expect(contactListPageHeaderResult).toBe(contactListPageHeader);
    });
  });

  test('Verify user registration with existing email in UI @TC2', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Unsuccessful User Registration");
    await displayName(`Add New User - Unsuccess`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = dataSetUI.getTestData('Header', 'SignUpPageHeader');

    const existingEmailErrorMessage: string = dataSetUI.getTestData('ErrorMessage', 'existingEmail');

    const firstName: string = dataSetUI.getTestData('UserRegExistingEmail', 'firstName');
    const lastName: string = dataSetUI.getTestData('UserRegExistingEmail', 'lastName');
    const email: string = dataSetUI.getTestData('UserRegExistingEmail', 'email');
    const password: string = dataSetUI.getTestData('UserRegExistingEmail', 'password');
    
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      expect(loginPageHeaderTxt).toBe(loginPageHeader);
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      expect(signUpPageHeaderResult).toBe(signUpPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await reusableScripts.enterSignUpCredentials(
        firstName,
        lastName,
        email,
        password
      );
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify Error Message Displayed', async () => {
      const errorMessage = await addUserPageInstance.verifyExistingEmailErrorMessage();
      expect(existingEmailErrorMessage).toBe(errorMessage);
    });
  });

  test('Verify user registration with missing mandatory fields in UI @TC3', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Unsuccessful User Registration");
    await displayName(`Add New User - Unsuccess`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = dataSetUI.getTestData('Header', 'SignUpPageHeader');

    const emptyFirstName: string = dataSetUI.getTestData('ErrorMessage', 'emptyFirstName');

    const firstName: string = dataSetUI.getTestData('UserRegEmptyFirstName', 'firstName');
    const lastName: string = dataSetUI.getTestData('UserRegEmptyFirstName', 'lastName');
    const email: string = dataSetUI.getTestData('UserRegEmptyFirstName', 'email');
    const password: string = dataSetUI.getTestData('UserRegEmptyFirstName', 'password');
    
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      expect(loginPageHeaderTxt).toBe(loginPageHeader);
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      expect(signUpPageHeaderResult).toBe(signUpPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await reusableScripts.enterSignUpCredentials(
        firstName,
        lastName,
        email,
        password
      );
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify Error Message Displayed', async () => {
      const errorMessageTxt = await addUserPageInstance.verifyErrorMessage();
      expect(emptyFirstName).toBe(errorMessageTxt);
    });
  });

  test('Verify user registration with firstname exceeding 20 characters in UI @TC4', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Unsuccessful User Registration");
    await displayName(`Add New User - Unsuccess`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = dataSetUI.getTestData('Header', 'SignUpPageHeader');

    const exceedFirstNameLimit: string = dataSetUI.getTestData('ErrorMessage', 'exceedFirstNameLimit');

    const firstName: string = dataSetUI.getTestData('UserRegExceedFirstNameLimit', 'firstName');
    const lastName: string = dataSetUI.getTestData('UserRegExceedFirstNameLimit', 'lastName');
    const email: string = dataSetUI.getTestData('UserRegExceedFirstNameLimit', 'email');
    const password: string = dataSetUI.getTestData('UserRegExceedFirstNameLimit', 'password');
    
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      expect(loginPageHeaderTxt).toBe(loginPageHeader);
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      expect(signUpPageHeaderResult).toBe(signUpPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await reusableScripts.enterSignUpCredentials(
        firstName,
        lastName,
        email,
        password
      );
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify Error Message Displayed', async () => {
      const errorMessageTxt = await addUserPageInstance.verifyErrorMessage();
      const errorMessageWithFirstnameValue = exceedFirstNameLimit.replace('{VALUE}', firstName);
      expect(errorMessageWithFirstnameValue).toBe(errorMessageTxt);
    });
  });

  test('Verify user registration with invalid email format in UI @TC5', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Unsuccessful User Registration");
    await displayName(`Add New User - Unsuccess`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const addUserPageInstance = new SignUpPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
    const signUpPageHeader: string = dataSetUI.getTestData('Header', 'SignUpPageHeader');

    const invalidEmailError: string = dataSetUI.getTestData('ErrorMessage', 'invalidEmail');

    const firstName: string = dataSetUI.getTestData('UserRegInvalidEmail', 'firstName');
    const lastName: string = dataSetUI.getTestData('UserRegInvalidEmail', 'lastName');
    const email: string = dataSetUI.getTestData('UserRegInvalidEmail', 'email');
    const password: string = dataSetUI.getTestData('UserRegInvalidEmail', 'password');
    
    const loginPageHeaderResult= await loginPageInstance.verifyLoginHeader();
    const loginPageHeaderTxt = await loginPageHeaderResult.textContent();
    
    await attach.withAllureStep(page, 'Step 1 - Click Sign Up Button', async () => {
      expect(loginPageHeaderTxt).toBe(loginPageHeader);
      await loginPageInstance.clickSignUp();
    });
    
    await attach.withAllureStep(page, 'Step 2 - User must be on Add User Page', async () => {
      const signUpPageHeaderResult = await addUserPageInstance.verifyAddUserHeader();
      expect(signUpPageHeaderResult).toBe(signUpPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 3 - Fill in credentials in Sign up Page', async () => {
      await reusableScripts.enterSignUpCredentials(
        firstName,
        lastName,
        email,
        password
      );
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await addUserPageInstance.clickSubmit();
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify Error Message Displayed', async () => {
      const errorMessageTxt = await addUserPageInstance.verifyErrorMessage();
      expect(invalidEmailError).toBe(errorMessageTxt);
    });
  });
});
