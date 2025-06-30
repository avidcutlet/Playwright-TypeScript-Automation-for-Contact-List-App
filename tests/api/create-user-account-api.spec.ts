import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const datasetUI = new DatasetUtil('ui');
const datasetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Create User Account in API @Regression @ALL @API', () => {

    test.beforeEach(async () => {
        await label(LabelName.PARENT_SUITE, "Regression");
        await label(LabelName.SUITE, "Create User Account via API");
    });

    test('Account Creation @APIUserCreation', async ({ page }) => {
        await label(LabelName.SUB_SUITE, "Successful User Account Creation");
        await displayName(`Add New User - Success`);
        await feature("API");

        const loginPageInstance = new LoginPage(page);
        const contactListPageInstance = new ContactListPage(page);
        const reusableScripts = new ReusableHelpers(page);

        const created: string = datasetAPI.getTestData('Response', 'Created');
        const loginPageHeader: string = datasetUI.getTestData('Header', 'LoginPageHeader');
        const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
        
        const { email, password, responseData, responseStatus } = await creationOfUser(null);

        expect(responseStatus).toBe(created);

        await attach.withAllureStep(page, 'Creation of Valid User', async () => {}, responseData ?? {});

        const loginPageHeaderLocator = await loginPageInstance.verifyLoginHeader();
        const loginPageHeaderTxt = await loginPageHeaderLocator.textContent();
        
        await attach.withAllureStep(page, 'Step 1 - Fill in Login Credentials', async () => {
            expect(loginPageHeaderTxt).toBe(loginPageHeader);
            await reusableScripts.enterLoginCredentials(email, password);
        });
        
        await attach.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
            await loginPageInstance.clickSubmit();
        });
        
        await attach.withAllureStep(page, 'Step 3 - Verify Successful Login', async () => {
            const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
            const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
            expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
        });
    });
}); 