import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser, invalidCreationOfUser } from '@api/api-create-user-account';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { userRegAPITestCases } from '@testData/user-registration-functionality-api-data';

import { label, LabelName, displayName, feature } from 'allure-js-commons';
const dataSetUI = new DatasetUtil('ui');
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Registration functionality via API @Regression @ALL @API @TS7', () => {
  for (const testCase of userRegAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
      
      if (!testCase.expectError) {
        const loginPage = new LoginPage(page);
        const contactList = new ContactListPage(page);
  
        const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
        const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
        const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
        const {
          email,
          password,
          responseData,
          responseStatus
        } = await creationOfUser();
  
        expect(responseStatus).toBe(createdStatus);
  
        await attach.withAllureStep(page, 'Creation of Valid User', async () => {}, responseData ?? {});

        await attach.withAllureStep(page, 'Step 1 - Fill in Login Credentials', async () => {
          const result =  await loginPage.verifyLoginHeader();
          expect(result).toBe(loginPageHeader);
          await loginPage.enterEmail(email);
          await loginPage.enterPassword(password);
        });
        
        await attach.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
          await loginPage.clickSubmit();
        });

        await attach.withAllureStep(page, 'Step 3 - Verify User Creation by Login Successful', async () => {
          await contactList.waitForContactListPageLoad();
          const result = await contactList.verifyContactListHeader();
          expect(result).toBe(contactListPageHeader);
        });
      } else {
        const firstName: string = dataSetAPI.getTestData(testCase.testDataKey, 'firstName');
        const lastName: string = dataSetAPI.getTestData(testCase.testDataKey, 'lastName');
        const email: string = dataSetAPI.getTestData(testCase.testDataKey, 'email');
        const password: string = dataSetAPI.getTestData(testCase.testDataKey, 'password');

        const credentialsToJson = {
          firstName,
          lastName,
          email,
        }
        
        await attach.withAllureStep(page, 'Step 1 - Creation of Invalid User via API', async () => {}, credentialsToJson ?? {});

        const invalidUserResponse = await invalidCreationOfUser(firstName, lastName, email, password);
        const errorResponseData = invalidUserResponse?.errorResponseData;
        const errorResponseMessage = invalidUserResponse?.errorResponseMessage;

        await attach.withAllureStep(page, 'Step 2 - Verify Error Message of Invalid User via API', async () => {
          const expectedErrorMessage = dataSetAPI.getTestData('ErrorMessage', testCase.expectedErrorKey!);
          const invalidRequest: string = dataSetAPI.getTestData('Response', 'InvalidRequest');
          const errorResponseStatus = invalidUserResponse?.errorResponseStatus;

          if (testCase.isDynamicError) {
            const invalidRequest = expectedErrorMessage.replace('{VALUE}', firstName);
            expect(errorResponseMessage).toBe(invalidRequest);

          } else {
            expect(errorResponseMessage).toBe(expectedErrorMessage);
            expect(errorResponseStatus).toBe(invalidRequest);
          }
        }, errorResponseData ?? {});
      }
    });
  }
});