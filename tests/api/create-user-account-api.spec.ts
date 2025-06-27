import { label, LabelName, displayName, feature } from 'allure-js-commons';

import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationofUser } from '@api/api-create-user-account';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';

const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

// Create User Account in API TC
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
        const reusableScripts = new ReusableHelpers(page);

        const loginPageHeader: string = datasetUI.getTestData('Header', 'LoginPageHeader');
        const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
        
        const { email, password, responseData } = await creationofUser();

        await attach.withAllureStep(page, 'Creation of Valid User', async () => {}, responseData ?? {});

        const loginPageHeaderLocator = await loginPageInstance.verifyLoginHeader();
        const loginPageHeaderTxt = await loginPageHeaderLocator.textContent();
        await expect(loginPageHeaderTxt).toBe(loginPageHeader);

        await attach.withAllureStep(page, 'Step 1 - Fill in Login Credentials', async () => {
            await reusableScripts.enterLoginCredentials(email, password);
        });
        
        await attach.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
            await loginPageInstance.clickSubmit();
        });
        
        await attach.withAllureStep(page, 'Step 3 - Verify Successful Login', async () => {
            const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
            const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
            await expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
        });
    });
}); 