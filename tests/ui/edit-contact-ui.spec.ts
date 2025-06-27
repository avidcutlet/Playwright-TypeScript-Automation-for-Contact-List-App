import { label, LabelName, displayName, feature } from 'allure-js-commons';

import { test, expect } from '@playwright/test';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { initializeTestHooks } from '@hooks/web-hook';

import { ContactDetailsPage } from '@pages/contact-details-page';
import { ContactListPage } from '@pages/contact-list-page';
import { EditContactPage } from '@pages/edit-contact-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';

const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

// Contact Management - Edit contact in UI
test.describe('Contact Management - Edit Contact via UI @ALL @UI @EditContact @tagToSkipInProd1', () => {

  let fakerData: ReturnType<typeof generateContactData>;

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Edit Contact via UI");

    fakerData = generateContactData();
  });
  
  test('Edit Contact in UI @TC27', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Edit");
    await displayName(`Edit Contact - Success`);
    await feature("UI");

    const contactListPageInstance = new ContactListPage(page);
    const contactDetailsPageInstance = new ContactDetailsPage(page);
    const editContactPageInstance = new EditContactPage(page);
    const reusableScripts = new ReusableHelpers(page);

    const contactListPageHeader: string = datasetUI.getTestData('Header', 'ContactListPageHeader');
    const contactDetailsPageHeader: string = datasetUI.getTestData('Header', 'ContactDetailsPageHeader');
    const editContactPageHeader: string = datasetUI.getTestData('Header', 'EditContactPageHeader');

    const editFirstNameData: string = datasetUI.getTestData('EditContactDetails', 'firstName');
    const editLastNameData: string = datasetUI.getTestData('EditContactDetails', 'lastName');
    

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

    await attach.withAllureStep(page, 'Step 2 - Click Edit Contact Button', async () => {
      await contactDetailsPageInstance.clickEditContact();
      const editContactPageHeaderLocator = await editContactPageInstance.verifyEditContactHeader();
      const editContactPageHeaderTxt = await editContactPageHeaderLocator.textContent()
      await expect(editContactPageHeaderTxt).toBe(editContactPageHeader);
    });

    await attach.withAllureStep(page, 'Step 3 - Modify one or more fields of the contact', async () => {
      await editContactPageInstance.removeFirstNameText();
      await editContactPageInstance.removeLastNameText();
      await editContactPageInstance.enterFirstName(editFirstNameData);
      await editContactPageInstance.enterLastName(editLastNameData);
    });
    
    await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
      await editContactPageInstance.clickSubmit();
      const contactDetailsPageHeaderLocator = await contactDetailsPageInstance.verifyContactDetailsHeader();
      const contactDetailsPageHeaderTxt = await contactDetailsPageHeaderLocator.textContent();
      await expect(contactDetailsPageHeaderTxt).toBe(contactDetailsPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify updated fields with new values and changes are saved', async () => {
      await expect(page.locator(`text=${editFirstNameData}`)).toBeVisible();
      await expect(page.locator(`text=${editLastNameData}`)).toBeVisible();
    });
  });
});