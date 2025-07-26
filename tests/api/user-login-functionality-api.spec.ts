import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { userLogin, invalidUserLogin } from '@api/api-user-login';
import { creationOfUser } from '@api/api-create-user-account';
import { userLoginAPITestCases } from '@testData/user-login-functionality-api-data';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const fakerData = generateContactData();
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Login functionality via API @Regression @ALL @API @TS8', () => {
  for (const testCase of userLoginAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
      
      const unauthorized: string = dataSetAPI.getTestData('Response', 'Unauthorized');
      
      if (testCase.createUser) {
        const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');

        const createdCredentials = {
            firstName: fakerData.firstName,
            lastName: fakerData.lastName,
            email: fakerData.email,
            password: fakerData.password,
          }
        
        const { responseStatus } = await creationOfUser({...createdCredentials});
        expect(responseStatus).toBe(createdStatus);

        if (testCase.expectError) {
          const incorrectPassword: string = dataSetAPI.getTestData('UserLoginEmptyCredentials', 'password');
          const invalidLoginResult = await invalidUserLogin(createdCredentials.email, incorrectPassword);
          const errorLoginResponseData = invalidLoginResult?.errorLoginResponseData;
          const errorLoginResponseStatus = invalidLoginResult?.errorLoginResponseStatus;
          
          const credentials = JSON.stringify({ email: createdCredentials.email, incorrectPassword: incorrectPassword }, null, 2);
          await attach.withAllureStep(page, 'Step 1 - Login of Invalid User', async () => {}, credentials ?? {});
          
          await attach.withAllureStep(page, 'Step 2 - Verify Failed Login of Invalid User', async () => {
            expect(errorLoginResponseStatus).toBe(unauthorized);
          }, errorLoginResponseData ?? {});
        } else {
          const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
          const { loginResponseData, loginResponseStatus } = await userLogin(createdCredentials.email, createdCredentials.password);
          
          const credentials = JSON.stringify({ email: createdCredentials.email, password: createdCredentials.password }, null, 2);
          await attach.withAllureStep(page, 'Step 1 - Login of Valid User', async () => {}, credentials ?? {});
          
          await attach.withAllureStep(page, 'Step 2 - Verify Success Login of Valid User', async () => {
            expect(loginResponseStatus).toBe(okStatus);
          }, loginResponseData ?? {});
        }
      } else {
        const emptyEmail: string = dataSetAPI.getTestData('UserLoginEmptyCredentials', 'email');
        const emptyPassword: string = dataSetAPI.getTestData('UserLoginEmptyCredentials', 'password');
        
        const invalidLoginResult = await invalidUserLogin(emptyEmail, emptyPassword);
        const errorLoginResponseData = invalidLoginResult?.errorLoginResponseData;
        const errorLoginResponseStatus = invalidLoginResult?.errorLoginResponseStatus;
        
        const credentials = JSON.stringify({ emptyEmail, emptyPassword }, null, 2);
        await attach.withAllureStep(page, 'Step 1 - Login of Invalid User', async () => {}, credentials ?? {});
        
        await attach.withAllureStep(page, 'Step 2 - Verify Failed Login of Invalid User', async () => {
          expect(errorLoginResponseStatus).toBe(unauthorized);
        }, errorLoginResponseData ?? {});
      }
    });
  }
});