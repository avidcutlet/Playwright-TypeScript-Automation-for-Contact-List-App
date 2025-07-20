import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { BasePage } from '@pages/base-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { LoginPage } from '@pages/login-page';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify User Logout functionality via UI @Regression @ALL @UI @TS6 @UIContactDeletion @tagToSkipInProd2', () => {

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Logout User via UI");
  });
  
  test('Logout User in UI @TC18', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Logout of User");
    await displayName(`Logout User - Success`);
    await feature("UI");

      const basePage = new BasePage(page);
      const loginPage = new LoginPage(page);
      const reusableScripts = new ReusableHelpers(page);
      
      const fakerData = generateContactData();
      const loginPageHeader: string = dataSetUI.getTestData('Header', 'LoginPageHeader');
      
      await reusableScripts.signUpUser(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );
      
      await attach.withAllureStep(page, 'Step 1 - Click Logout Button', async () => {
        await basePage.clickLogout();
      });
      
      await attach.withAllureStep(page, 'Step 2 - Verify Login Page', async () => {
        const result = await loginPage.verifyLoginHeader();
        expect(result).toBe(loginPageHeader);
    });
  });
});
