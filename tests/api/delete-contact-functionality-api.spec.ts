import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { creationOfContact } from '@api/api-create-contact';
import { userLogin } from '@api/api-user-login';
import { getContactList } from '@api/api-read-contacts';
import { deleteContactAPITestCases } from '@testData/delete-contact-functionality-api-data';
import { deleteSpecificContact, deleteInvalidID } from '@api/api-delete-contact';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
const fakerData = generateContactData();
initializeTestHooks().setupHooks();

test.describe('Verify Contact List display & View Details via API @Regression @ALL @API @TS12', () => {
  for (const testCase of deleteContactAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
      
      const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
      const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
      const notFoundStatus: string = dataSetAPI.getTestData('Response', 'NotFound');
      const createForContactList: string = dataSetAPI.getTestData('CreateJsonFileName', 'ContactList');
        
      
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
        
        const {
          responseStatus: createContactResponseStatus,
          contactId
        } = await creationOfContact(userLoggedInToken);
        expect(createContactResponseStatus).toBe(createdStatus);
        
        const {
          responseData: contactListResponseData,
          responseStatus: contactListResponseStatus
        } = await getContactList(userLoggedInToken);
        
        await attach.withAllureStep(page, 'Step 1 - Verify Contact List in API', async () => {
          expect(contactListResponseStatus).toBe(okStatus);
        }, contactListResponseData ?? {});

        
      const {
        responseData: deleteSpecificContactResponseData,
        responseStatus: deleteSpecificContactResponseStatus
      } = await deleteSpecificContact(userLoggedInToken, contactId);
        
      if (testCase.success) {

        await attach.withAllureStep(page, 'Step 2 - Verify Deleted Specific Contact List in API', async () => {
          expect(deleteSpecificContactResponseStatus).toBe(okStatus);
        }, deleteSpecificContactResponseData ?? {});

      } else {

        const {
          errorDeleteResponseData: deleteSpecificContactResponseData, 
          errorDeleteResponseStatus: deleteSpecificContactResponseStatus
        } = await deleteInvalidID(userLoggedInToken, contactId) ?? {};
        
        await attach.withAllureStep(page, 'Step 2 - Verify Not Found Specific Contact List in API', async () => {
          expect(deleteSpecificContactResponseStatus).toBe(notFoundStatus);
        }, deleteSpecificContactResponseData ?? {});
      }
    });
  }
});