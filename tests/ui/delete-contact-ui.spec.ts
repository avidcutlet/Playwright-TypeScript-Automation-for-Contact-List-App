import { test, expect } from '@playwright/test';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { initializeTestHooks } from '@hooks/web-hook';

import { LoginPage } from '@pages/login-page';
import { ContactDetailsPage } from '@pages/contact-details-page';
import { ContactListPage } from '@pages/contact-list-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { AddContactPage } from '@pages/add-contact-page';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Contact Management - Delete Contact via UI @Regression @ALL @UI @UIContactDeletion @tagToSkipInProd2', () => {

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Delete Contact via UI");
  });
  
  test('Delete Contact in UI', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Deletion of Contact");
    await displayName(`Delete Contact - Success`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const contactDetailsPageInstance = new ContactDetailsPage(page);
    const addContactPageInstance = new AddContactPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
    const contactDetailsPageHeader: string = datasetUI.getTestData('Header', 'ContactDetailsPageHeader');
    const fakerData = generateContactData();
    
    await loginPageInstance.clickSignUp();
    await reusableScripts.signUpUser(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    await loginPageInstance.clickSubmit();
    const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
    const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent();
    expect(contactListPageHeaderTxt).toBe(contactListPageHeader);


    await contactListPageInstance.clickAddContact();
    await reusableScripts.addNewContact(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.birthdate,
      fakerData.phone,
      fakerData.street1,
      fakerData.street2,
      fakerData.city,
      fakerData.stateProvince,
      fakerData.postalCode,
      fakerData.country
      );
    await addContactPageInstance.clickSubmit();
    expect(contactListPageHeaderTxt).toBe(contactListPageHeader);

    await attach.withAllureStep(page, 'Step 1 - Select a Contact from the list', async () => {
      await contactListPageInstance.clickContactByName(fakerData.firstName + ' ' + fakerData.lastName);
    });

    await attach.withAllureStep(page, 'Step 2 - User is on the Contact Details Page', async () => {
      const contactDetailsPageHeaderLocator = await contactDetailsPageInstance.verifyContactDetailsHeader();
      const contactDetailsPageHeaderTxt = await contactDetailsPageHeaderLocator.textContent()
      expect(contactDetailsPageHeaderTxt).toBe(contactDetailsPageHeader);
    });

    await attach.withAllureStep(page, 'Step 3 - Click Delete Contact Button', async () => {
      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete this contact?');
        await dialog.accept();
      });
      await contactDetailsPageInstance.clickDeleteContact();
    });
    
    await attach.withAllureStep(page, 'Step 4 - Verify Contact is deleted from the list', async () => {
      expect(page.getByText(`${fakerData.firstName} ${fakerData.lastName}`)).not.toBeVisible();
    });
  });
});