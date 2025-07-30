import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { creationOfContact } from '@api/api-create-contact';
import { userLogin } from '@api/api-user-login';
import { fullUpdateSpecificContact, partialUpdateSpecificContact, updateInvalidID } from '@api/api-update-contact';
import { updateContactAPITestCases } from '@testData/edit-contact-functionality-api-data';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Contact List display & View Details via API @Regression @ALL @API @TS10', () => {
  for (const testCase of updateContactAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
      
      const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
      const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
      const invalidRequestStatus: string = dataSetAPI.getTestData('Response', 'InvalidRequest');
      const createForContactList: string = dataSetAPI.getTestData('CreateJsonFileName', 'ContactList');
      
      const fakerData = generateContactData();
      const credentials = {
        firstName: fakerData.firstName,
        lastName: fakerData.lastName,
        email: fakerData.email,
        password: fakerData.password,
      }
      
      const {
        responseStatus: createUserResponseStatus
      } = await creationOfUser({from: createForContactList, ...credentials});
      expect(createUserResponseStatus).toBe(createdStatus);
      
      const {
        loggedInToken: userLoggedInToken,
        loginResponseStatus: userLoggedInResponseStatus
      } = await userLogin(credentials.email, credentials.password);
      expect(userLoggedInResponseStatus).toBe(okStatus);

      if (testCase.expectError) {
        const nonExistentID: string = dataSetAPI.getTestData(testCase.testDataKey, 'id');

      const {
        errorUpdateResponseData: invalidUpdateResponseData,
        errorUpdateResponseStatus: invalidUpdateResponseStatus
      } = await updateInvalidID(userLoggedInToken, nonExistentID, credentials) ?? {};

      await attach.withAllureStep(page, 'Step 1 - Verify Failed Update Invalid Contact ID in API', async () => {
        expect(invalidUpdateResponseStatus).toBe(invalidRequestStatus);
      }, invalidUpdateResponseData ?? {});

      } else {
        
        const {
          responseData: createdContactResponseData,
          responseStatus: createContactResponseStatus,
          contactId
        } = await creationOfContact(userLoggedInToken);
        
        if (testCase.displayName.includes('Full')) {

          await attach.withAllureStep(page, 'Step 1 - Verify Specific Contact ID in API', async () => {
            expect(createContactResponseStatus).toBe(createdStatus); 
          }, createdContactResponseData ?? {});
          
          const fullUpdateContactData = {
            firstName: dataSetAPI.getTestData(testCase.testDataKey, 'firstName'),
            lastName: dataSetAPI.getTestData(testCase.testDataKey, 'lastName'),
            birthdate: dataSetAPI.getTestData(testCase.testDataKey, 'birthdate'),
            email: dataSetAPI.getTestData(testCase.testDataKey, 'email'),
            phone: dataSetAPI.getTestData(testCase.testDataKey, 'phone'),
            street1: dataSetAPI.getTestData(testCase.testDataKey, 'street1'),
            street2: dataSetAPI.getTestData(testCase.testDataKey, 'street2'),
            city: dataSetAPI.getTestData(testCase.testDataKey, 'city'),
            stateProvince: dataSetAPI.getTestData(testCase.testDataKey, 'stateProvince'),
            postalCode: dataSetAPI.getTestData(testCase.testDataKey, 'postalCode'),
            country: dataSetAPI.getTestData(testCase.testDataKey, 'country')
          }

          const {
            responseData: updatedContactListResponseData,
            responseStatus: updatedContactListResponseStatus
          } = await fullUpdateSpecificContact(userLoggedInToken, contactId, fullUpdateContactData);

          await attach.withAllureStep(page, 'Step 2 - Verify Successful Update Specific Contact ID in API', async () => {
            expect(updatedContactListResponseStatus).toBe(okStatus);
          }, updatedContactListResponseData ?? {});

        } else {

          await attach.withAllureStep(page, 'Step 1 - Verify Specific Contact ID in API', async () => {
            expect(createContactResponseStatus).toBe(createdStatus); 
          }, createdContactResponseData ?? {});
          
          const partialUpdateContactData = {
            firstName: dataSetAPI.getTestData(testCase.testDataKey, 'firstName'),
            lastName: dataSetAPI.getTestData(testCase.testDataKey, 'lastName'),
            email: dataSetAPI.getTestData(testCase.testDataKey, 'email')
          }

          const {
            responseData: updatedContactListResponseData,
            responseStatus: updatedContactListResponseStatus
          } = await partialUpdateSpecificContact(userLoggedInToken, contactId, partialUpdateContactData);

          await attach.withAllureStep(page, 'Step 2 - Verify Successful Update Specific Contact ID in API', async () => {
            expect(updatedContactListResponseStatus).toBe(okStatus);
          }, updatedContactListResponseData ?? {});
        }
      }
    });
  }
});