import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';
import { creationofUser } from '@api/api-create-user-account';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import DatasetUtil from '@utils/test-data-util';
import AllureAttachScreenshot from '@utils/allure-report-util';
import { label, LabelName, displayName, feature } from 'allure-js-commons';

const DATASET_UI = new DatasetUtil('ui');
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

        const LOGIN_PAGE_INSTANCE = new LoginPage(page);
        const CONTACT_LIST_PAGE_INSTANCE = new ContactListPage(page);
        const REUSABLE_SCRIPTS = new ReusableHelpers(page);

        const LOGIN_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'LoginPageHeader');
        const CONTACT_LIST_PAGE_HEADER: string = DATASET_UI.getTestData('Header', 'ContactListPageHeader');
        
        const CREATE_USER_RESULT = await creationofUser();

        const LOGIN_PAGE_HEADER_LOCATOR = await LOGIN_PAGE_INSTANCE.verifyLoginHeader();
        const LOGIN_PAGE_HEADER_TXT = await LOGIN_PAGE_HEADER_LOCATOR.textContent();
        await expect(LOGIN_PAGE_HEADER_TXT).toBe(LOGIN_PAGE_HEADER);

        // Change verification of user creation through API
        await ATTACH.withAllureStep(page, 'Step 1 - Fill in Login Credentials', async () => {
            await REUSABLE_SCRIPTS.enterLoginCredentials(CREATE_USER_RESULT.EMAIL, CREATE_USER_RESULT.PASSWORD);
        });
        
        await ATTACH.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
            await LOGIN_PAGE_INSTANCE.clickSubmit();
        });
        
        await ATTACH.withAllureStep(page, 'Step 3 - Verify Successful Login', async () => {
            const CONTACT_LIST_PAGE_HEADER_LOCATOR = await CONTACT_LIST_PAGE_INSTANCE.verifyContactListHeader();
            const CONTACT_LIST_PAGE_HEADER_TXT = await CONTACT_LIST_PAGE_HEADER_LOCATOR.textContent();
            await expect(CONTACT_LIST_PAGE_HEADER_TXT).toBe(CONTACT_LIST_PAGE_HEADER);
        });
    });
}); 