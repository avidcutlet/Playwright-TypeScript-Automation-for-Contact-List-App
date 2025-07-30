import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { creationOfContact } from '@api/api-create-contact';
import { userLogin } from '@api/api-user-login';
import { getContactList, getSpecificContact } from '@api/api-read-contacts';
import { getContactAPITestCases } from '@testData/contact-list-display-view-details-api-data';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
const fakerData = generateContactData();
initializeTestHooks().setupHooks();

test.describe('Verify Contact List display & View Details via API @Regression @ALL @API @TS10', () => {
  for (const testCase of getContactAPITestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("API");
      
      const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
      const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
      const createForContactList: string = dataSetAPI.getTestData('CreateJsonFileName', 'ContactList');
        
      if (testCase.isContactList) {

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
          responseStatus: createContactResponseStatus
        } = await creationOfContact(userLoggedInToken);
        expect(createContactResponseStatus).toBe(createdStatus);

        const {
          responseStatus: createSecondContactResponseStatus
        } = await creationOfContact(userLoggedInToken);
        expect(createSecondContactResponseStatus).toBe(createdStatus);

        const {
          responseData: contactListResponseData,
          responseStatus: contactListResponseStatus
        } = await getContactList(userLoggedInToken);

        await attach.withAllureStep(page, 'Step 1 - Verify Contact List in API', async () => {
          expect(contactListResponseStatus).toBe(okStatus);
        }, contactListResponseData ?? {});

      } else {
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
        } = await getSpecificContact(userLoggedInToken, contactId);

        await attach.withAllureStep(page, 'Step 1 - Verify Specific Contact in API', async () => {
          expect(contactListResponseStatus).toBe(okStatus);
        }, contactListResponseData ?? {});
      }
    });
  }
});