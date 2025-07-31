import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { userLogin } from '@api/api-user-login';
import { userLogout } from '@api/api-user-logout';
import { generateContactData } from '@testData/test-data-generator';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const fakerData = generateContactData();
const dataSetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Login functionality via API @Regression @ALL @API @TS13', () => {
  test(`TC39 - Successful User Logout via API`, async ({ page }) => {
    await label(LabelName.PARENT_SUITE, "Regression")
    await label(LabelName.SUITE, "Logout User via API")
    await label(LabelName.SUB_SUITE, "Successful User Logout via API")
    await displayName(`Successful User Logout`)

    const createdStatus: string = dataSetAPI.getTestData('Response', 'CreatedStatus');
    const okStatus: string = dataSetAPI.getTestData('Response', 'OKStatus');
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
      loginResponseData: userLoggedInResponseData,
      loginResponseStatus: userLoggedInResponseStatus
    } = await userLogin(credentials.email, credentials.password);

    await attach.withAllureStep(page, 'Step 1 - Verify Login User via API', async () => {
      expect(userLoggedInResponseStatus).toBe(okStatus);
    }, userLoggedInResponseData ?? {});

    const {
      logoutResponseData: userLogoutResponseData,
      logoutResponseStatus: userLogoutResponseStatus
    } = await userLogout(userLoggedInToken);

    await attach.withAllureStep(page, 'Step 2 - Verify Successful User Logout via API', async () => {
      expect(userLogoutResponseStatus).toBe(okStatus);
    }, userLogoutResponseData ?? {});
  });
});