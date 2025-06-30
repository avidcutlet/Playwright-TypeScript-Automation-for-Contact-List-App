import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { creationOfUser } from '@api/api-create-user-account';
import { creationOfContact, invalidCreationOfContact } from '@api/api-create-contact';
import { ContactListPage } from '@pages/contact-list-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const datasetUI = new DatasetUtil('ui');
const datasetAPI = new DatasetUtil('api');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Create Contact Account in API @Regression @ALL @API', () => {
    
    test.beforeEach(async () => {
        await label(LabelName.PARENT_SUITE, "Regression");
    });
    
    test('Contact Creation @APIContactCreation', async ({ page }) => {
        await label(LabelName.SUITE, "Create Contact via API");
        await label(LabelName.SUB_SUITE, "Successful Contact Creation");
        await displayName(`Add New Contact - Success`);
        await feature("API");
        
        const loginPageInstance = new LoginPage(page);
        const contactListPageInstance = new ContactListPage(page);
        const reusableScripts = new ReusableHelpers(page);
        
        const loginPageHeader: string = datasetUI.getTestData('Header', 'LoginPageHeader');
        const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
        const createdStatus: string = datasetAPI.getTestData('Response', 'CreatedStatus');
        const createContact: string = datasetAPI.getTestData('jsonFileName', 'CreateContact');
        
        const {
            email,
            password,
            responseStatus: createUserResponseStatus
        } = await creationOfUser(createContact);
        
        expect(createUserResponseStatus).toBe(createdStatus);
        
        const loginPageHeaderLocator = await loginPageInstance.verifyLoginHeader();
        const loginPageHeaderTxt = await loginPageHeaderLocator.textContent();
        
        const {
            fullName,
            responseData: createContactResponseData,
            responseStatus: createContactResponseStatus
        } = await creationOfContact();
        
        await attach.withAllureStep(page, 'Step 1 - Creation of Valid Contact in API', async () => {
            expect(createContactResponseStatus).toBe(createdStatus);
        }, createContactResponseData ?? {});
        
        await attach.withAllureStep(page, 'Step 2 - User is Loggedin in UI', async () => {
            expect(loginPageHeaderTxt).toBe(loginPageHeader);
            await reusableScripts.enterLoginCredentials(email, password);
            await loginPageInstance.clickSubmit();
            const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
            const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
            expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
        });
        
        await attach.withAllureStep(page, 'Step 3 - Verify Added New Contact in UI', async () => {
            expect(page.getByText(fullName)).toBeVisible();
        });
    });
    
    test('Invalid Contact Creation @APIInvalidContactCreation', async ({ page }) => {
        await label(LabelName.SUITE, "Invalid Contact via API");
        await label(LabelName.SUB_SUITE, "Failed Invalid Contact Creation");
        await displayName(`Add New Invalid Contact - Failed`);
        await feature("API");
        
        const createdStatus: string = datasetAPI.getTestData('Response', 'CreatedStatus');
        const invalidRequest: string = datasetAPI.getTestData('Response', 'InvalidRequest');
        const createInvalidContact: string = datasetAPI.getTestData('jsonFileName', 'CreateInvalidContact');
        
        const {
            responseStatus: createUserResponseStatus
        } = await creationOfUser(createInvalidContact);

        expect(createUserResponseStatus).toBe(createdStatus);
        
        const invalidContactResult = await invalidCreationOfContact();
        const responseData = invalidContactResult?.responseData;
        const responseStatus = invalidContactResult?.responseStatus;
        
        await attach.withAllureStep(page, 'Step 1 - Creation of Invalid Contact in API', async () => {
            expect(responseStatus).toBe(invalidRequest);
        }, responseData ?? {});
    });
}); 