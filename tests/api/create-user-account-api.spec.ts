import { test, expect } from '@playwright/test';

import { creationofUser } from '@api/api-create-user-account';
import { initializeTestHooks } from '@hooks/web-hook';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { label, LabelName, displayName, feature } from 'allure-js-commons';
import AllureAttachScreenshot from '@utils/allure-report-util';

const ATTACH = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();
 
test.describe('Create User Account in API @ALL @API @APIcreateuseraccount', () => {

    test.beforeEach(async () => {
        await label(LabelName.PARENT_SUITE, "Regression");
        await label(LabelName.SUITE, "Create User Account via API");
    });

    test('Account Creation ', async ({ page }) => {
        await label(LabelName.SUB_SUITE, "Successful User Account Creation");
        await displayName(`Add New User - Success`);
        await feature("API");

        const loginPageInstance = new LoginPage(page);
        const contactListPageInstance = new ContactListPage(page);
        const REUSABLE_SCRIPTS = new ReusableHelpers(page);
        
        const result = await creationofUser();

        const loginPageHeader = await loginPageInstance.verifyLoginHeader();
        await expect(loginPageHeader).toBe('Contact List App');

        // Change verification of user creation through API
        await ATTACH.withAllureStep(page, 'Step 1 - Fill in Login Credentials', async () => {
            await REUSABLE_SCRIPTS.enterLoginCredentials(result.EMAIL, result.PASSWORD);
        });
        
        await ATTACH.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
            await loginPageInstance.clickSubmit();
        });
        
        await ATTACH.withAllureStep(page, 'Step 3 - Verify Successful Login', async () => {
            const contactListHeader = await contactListPageInstance.verifyContactListHeader();
            await expect(contactListHeader).toBe('Contact List');
        });
    });
}); 