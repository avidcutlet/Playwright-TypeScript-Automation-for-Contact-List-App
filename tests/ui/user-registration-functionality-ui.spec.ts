import { test, expect, Page } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';
import { generateContactData } from '@testData/test-data-generator';
import { userRegUITestCases } from '@testData/user-registration-functionality-ui-data';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Registration functionality via UI @Regression @ALL @UI @TS1 @UserRegistration @tagToSkipInProd3', () => {
  for (const testCase of userRegUITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUB_SUITE, testCase.subSuite);
      await displayName(testCase.displayName);
      await feature("UI");

      const loginPage = new LoginPage(page);
      const signUpPage = new SignUpPage(page);
      const contactListPage = new ContactListPage(page);

      const loginHeader = dataSetUI.getTestData('Header', 'LoginPageHeader');
      const signUpHeader = dataSetUI.getTestData('Header', 'SignUpPageHeader');

      const userData = testCase.testDataKey === 'faker'
        ? generateContactData()
        : {
            firstName: dataSetUI.getTestData(testCase.testDataKey, 'firstName'),
            lastName: dataSetUI.getTestData(testCase.testDataKey, 'lastName'),
            email: dataSetUI.getTestData(testCase.testDataKey, 'email'),
            password: dataSetUI.getTestData(testCase.testDataKey, 'password'),
          };

      const result = await loginPage.verifyLoginHeader();

      await attach.withAllureStep(page, 'Click Sign Up Button', async () => {
        expect(result).toBe(loginHeader);
        await loginPage.clickSignUp();
      });

      await attach.withAllureStep(page, 'User is on Add User Page', async () => {
        const result = await signUpPage.verifyAddUserHeader();
        expect(result).toBe(signUpHeader);
      });

      await attach.withAllureStep(page, 'Fill in Sign Up Form', async () => {
        await signUpPage.enterFirstName(userData.firstName);
        await signUpPage.enterLastName(userData.lastName);
        await signUpPage.enterEmail(userData.email);
        await signUpPage.enterPassword(userData.password);
      });

      await attach.withAllureStep(page, 'Click Submit Button', async () => {
        await signUpPage.clickSubmit();
      });

      if (!testCase.expectError) {
        const contactListHeader = dataSetUI.getTestData('Header', testCase.expectedHeader!);

        await attach.withAllureStep(page, 'Verify Success Page Header', async () => {
          const result = await contactListPage.verifyContactListHeader();
          expect(result).toBe(contactListHeader);
        });

      } else {
        const expectedError = dataSetUI.getTestData('ErrorMessage', testCase.expectedErrorKey!);
        
        await attach.withAllureStep(page, 'Verify Error Message Displayed', async () => {
          const actualError = await signUpPage.getErrorMessageByKey(testCase.expectedErrorKey!);
          if (testCase.isDynamicError) {
            const expected = expectedError.replace('{VALUE}', userData.firstName);
            expect(actualError).toBe(expected);

          } else {
            expect(actualError).toBe(expectedError);
          }
        });
      }
    });
  }
});
