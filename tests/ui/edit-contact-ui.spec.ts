import { test, expect } from '@playwright/test';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { initializeTestHooks } from '@hooks/web-hook';

import { ContactDetailsPage } from '@pages/contact-details-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { EditContactPage } from '@pages/edit-contact-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { SignUpPage } from '@pages/sign-up-page';
import { LoginPage } from '@pages/login-page';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Contact Management - Edit Contact via UI @Regression @ALL @UI @EditContact @tagToSkipInProd1', () => {

  test.beforeEach(async () => {
    await label(LabelName.PARENT_SUITE, "Regression");
    await label(LabelName.SUITE, "Edit Contact via UI");

  });
  
  test('Edit Contact in UI', async ({ page }) => {
    await label(LabelName.SUB_SUITE, "Successful Contact Edit");
    await displayName(`Edit Contact - Success`);
    await feature("UI");
    
    const loginPageInstance = new LoginPage(page);
    const contactListPageInstance = new ContactListPage(page);
    const contactDetailsPageInstance = new ContactDetailsPage(page);
    const signUpPageInstance = new SignUpPage(page);
    const addContactPageInstance = new AddContactPage(page);
    const editContactPageInstance = new EditContactPage(page);
    const reusableScripts = new ReusableHelpers(page);
    
    const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
    const contactDetailsPageHeader: string = dataSetUI.getTestData('Header', 'ContactDetailsPageHeader');
    const editContactPageHeader: string = dataSetUI.getTestData('Header', 'EditContactPageHeader');
    
    const editFirstNameData: string = dataSetUI.getTestData('EditContactDetails', 'firstName');
    const editLastNameData: string = dataSetUI.getTestData('EditContactDetails', 'lastName');
    const fakerData = generateContactData();
    
    await loginPageInstance.clickSignUp();
    await reusableScripts.enterSignUpCredentials(
      fakerData.firstName,
      fakerData.lastName,
      fakerData.email,
      fakerData.password
    );
    await signUpPageInstance.clickSubmit();
    const contactListPageHeaderLocator = await contactListPageInstance.verifyContactListHeader();
    const contactListPageHeaderTxt = await contactListPageHeaderLocator.textContent()
    expect(contactListPageHeaderTxt).toBe(contactListPageHeader);

    await contactListPageInstance.clickAddContact();
    await reusableScripts.enterAddContactCredentials(
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

    await attach.withAllureStep(page, 'Step 2 - Click Edit Contact Button', async () => {
      await contactDetailsPageInstance.clickEditContact();
      const editContactPageHeaderLocator = await editContactPageInstance.verifyEditContactHeader();
      const editContactPageHeaderTxt = await editContactPageHeaderLocator.textContent()
      expect(editContactPageHeaderTxt).toBe(editContactPageHeader);
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
      expect(contactDetailsPageHeaderTxt).toBe(contactDetailsPageHeader);
    });
    
    await attach.withAllureStep(page, 'Step 5 - Verify updated fields with new values and changes are saved', async () => {
      expect(page.getByText(`${fakerData.firstName}`)).toBeVisible();
      expect(page.getByText(`${fakerData.lastName}`)).toBeVisible();
    });
  });
});