import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { userLogin } from '@api/api-user-login';
import { creationOfContact, invalidCreationOfContact } from '@api/api-create-contact';
import { addContactAPITestCases } from '@testData/add-contact-functionality-api-data';
import { generateContactData } from '@testData/test-data-generator';

const fakerData = generateContactData();

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Add Contact functionality via API @Regression @ALL @API @TS9', () => {
  for (const testCase of addContactAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
        
      if (!testCase.expectError) {
        const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
        const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
        const createContact: string = dataSetAPI.getTestData('CreateJsonFileName', 'CreateContact');
        
        const credentials = {
          firstName: fakerData.firstName,
          lastName: fakerData.lastName,
          email: fakerData.email,
          password: fakerData.password,
        }
        const {
          responseStatus: createUserResponseStatus
        } = await creationOfUser({from: createContact, ...credentials});
        expect(createUserResponseStatus).toBe(createdStatus);

        const {
          loggedInToken: userLoggedInToken,
          loginResponseStatus: userLoggedInResponseStatus
        } = await userLogin(credentials.email, credentials.password);
        expect(userLoggedInResponseStatus).toBe(okStatus);
        
        const {
          createdContact,
          responseData,
          responseStatus: createContactResponseStatus
        } = await creationOfContact(userLoggedInToken);
        
        await attach.withAllureStep(page, 'Step 1 - Creation of Valid Contact in API', async () => {}, createdContact ?? {});
        
        await attach.withAllureStep(page, 'Step 2 - Verify Added New Contact in API', async () => {
          expect(createContactResponseStatus).toBe(createdStatus);
        }, responseData ?? {});

      } else {

        const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
        const unauthorized: string = dataSetAPI.getTestData('Response', 'Unauthorized');
        const invalidRequest: string = dataSetAPI.getTestData('Response', 'InvalidRequest');
        const createInvalidContact: string = dataSetAPI.getTestData('CreateJsonFileName', 'CreateInvalidContact');

        const credentials = {
          firstName: fakerData.firstName,
          lastName: fakerData.lastName,
          email: fakerData.email,
          password: fakerData.password,
        }
        const {
          responseStatus: createUserResponseStatus
        } = await creationOfUser({from: createInvalidContact, ...credentials});
        expect(createUserResponseStatus).toBe(createdStatus);

        const firstName: string = dataSetAPI.getTestData(testCase.testDataKey, 'firstName');
        const lastName: string = dataSetAPI.getTestData(testCase.testDataKey, 'lastName');
        const birthdate: string = dataSetAPI.getTestData(testCase.testDataKey, 'birthdate');
        const email: string = dataSetAPI.getTestData(testCase.testDataKey, 'email');
        const phone: string = dataSetAPI.getTestData(testCase.testDataKey, 'phone');
        const street1: string = dataSetAPI.getTestData(testCase.testDataKey, 'street1');
        const street2: string = dataSetAPI.getTestData(testCase.testDataKey, 'street2');
        const city: string = dataSetAPI.getTestData(testCase.testDataKey, 'city');
        const stateProvince: string = dataSetAPI.getTestData(testCase.testDataKey, 'stateProvince');
        const postalCode: string = dataSetAPI.getTestData(testCase.testDataKey, 'postalCode');
        const country: string = dataSetAPI.getTestData(testCase.testDataKey, 'country');

        let authToken: string;
        if (testCase.isInvalidAuthToken) {
          authToken = dataSetAPI.getTestData(testCase.testAuthDataKey!, 'InvalidToken');
          
        } else {
          const dataSetAPIToken = new DatasetUtil('tokenforcreateinvalidcontact');
          authToken = dataSetAPIToken.getTestData('token');

        }
        const invalidContactCreation: string = JSON.stringify({
          firstName,
          lastName,
          birthdate,
          email,
          phone,
          street1,
          street2,
          city,
          stateProvince,
          postalCode,
          country,
          authToken
        }, null, 2);
        
        const invalidContactResult = await invalidCreationOfContact(
          firstName,
          lastName,
          birthdate,
          email,
          phone,
          street1,
          street2,
          city,
          stateProvince,
          postalCode,
          country,
          authToken
        );
        const responseData = invalidContactResult?.errorResponseData;
        const responseStatus = invalidContactResult?.errorResponseStatus;
        
        await attach.withAllureStep(page, 'Step 1 - Creation of Invalid Authentication in API', async () => {
        }, invalidContactCreation ?? {});
        
        await attach.withAllureStep(page, 'Step 2 - Verify Error Message Displayed', async () => {
        testCase.isInvalidAuthToken
          ? expect(responseStatus).toBe(unauthorized)
          : expect(responseStatus).toBe(invalidRequest);
        }, responseData ?? {});
      }
    });
  }
});