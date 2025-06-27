import { label, LabelName, displayName, feature } from 'allure-js-commons';

import { test, expect } from '@playwright/test';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { initializeTestHooks } from '@hooks/web-hook';

import { ContactDetailsPage } from '@pages/contact-details-page';
import { ContactListPage } from '@pages/contact-list-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';

const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

// Contact Management - Delete contact in UI TC
test.describe('Contact Management - Delete Contact via UI @ALL @UI @DeleteContact @tagToSkipInProd2', () => {

  let fakerData: ReturnType<typeof generateContactData>;

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Delete Contact via UI");

    fakerData = generateContactData();
  });
  
  test('Delete Contact in UI @TC37', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Deletion of Contact");
    await displayName(`Delete Contact - Success`);
    await feature("UI");

    const contactListPageInstance = new ContactListPage(page);
    const contactDetailsPageInstance = new ContactDetailsPage(page);
    const reusableScripts = new ReusableHelpers(page);

    const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
    const contactDetailsPageHeader: string = datasetUI.getTestData('Header', 'ContactDetailsPageHeader');

    const signUpResult = await reusableScripts.signUpAndVerify(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    const contactListPageHeaderTxt = await signUpResult.textContent()
    await expect(contactListPageHeaderTxt).toBe(contactListPageHeader);


    const addContactPageHeaderLocator = await reusableScripts.addContactAndVerify(
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
    const contactListPageHeaderTxt2 = await addContactPageHeaderLocator.textContent()
    await expect(contactListPageHeaderTxt2).toBe(contactListPageHeader);

    await attach.withAllureStep(page, 'Step 1 - Select a Contact from the list', async () => {
      await contactListPageInstance.clickContactByName(fakerData.firstName + ' ' + fakerData.lastName);
    });

    await attach.withAllureStep(page, 'Step 2 - User is on the Contact Details Page', async () => {
      const contactDetailsPageHeaderLocator = await contactDetailsPageInstance.verifyContactDetailsHeader();
      const contactDetailsPageHeaderTxt = await contactDetailsPageHeaderLocator.textContent()
      await expect(contactDetailsPageHeaderTxt).toBe(contactDetailsPageHeader);
    });

    await attach.withAllureStep(page, 'Step 3 - Click Delete Contact Button', async () => {
      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete this contact?');
        await dialog.accept();
      });
      await contactDetailsPageInstance.clickDeleteContact();
    });
    
    await attach.withAllureStep(page, 'Step 4 - Verify Contact is deleted from the list', async () => {
      await expect(page.locator(`text=${fakerData.firstName} ${fakerData.lastName}`)).not.toBeVisible();
    });
  });
});