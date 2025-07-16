import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { AddContactPage } from '@pages/add-contact-page';
import { ContactListPage } from '@pages/contact-list-page';
import { ContactDetailsPage } from '@pages/contact-details-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { contactListDisplayTestCases } from '@testData/contact-list-display-view-details-data';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Add Contact functionality via UI @Regression @ALL @TS3 @UI @tagToSkipInProd3', () => {
  for (const testCase of contactListDisplayTestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("UI");

      const loginPage = new LoginPage(page);
      const contactListPage = new ContactListPage(page);
      const addContactPage = new AddContactPage(page);
      const contactDetailsPage = new ContactDetailsPage(page);
      const reusableScripts = new ReusableHelpers(page);
      
      const fakerData = generateContactData();
      const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
      const addContactPageHeader: string = dataSetUI.getTestData('Header', 'AddContactPageHeader');
      const contactDetailsPageHeader: string = dataSetUI.getTestData('Header', 'ContactDetailsPageHeader');

      
      await loginPage.clickSignUp();
      await reusableScripts.enterSignUpCredentials(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );
      await loginPage.clickSubmit();
      const contactListPageHeaderTxt = await contactListPage.verifyContactListHeader();
      
      await attach.withAllureStep(page, 'Step 1 - Navigate to Contact list page', async () => {
        expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
      });

      await attach.withAllureStep(page, 'Step 2 - Click Add Contact Button', async () => {
        await contactListPage.clickAddContact();
      });
      
      await attach.withAllureStep(page, 'Step 3 - Verify Add Contact Page', async () => {
        const addContactPageHeaderTxt = await addContactPage.verifyAddContactHeader();
        expect(addContactPageHeaderTxt).toBe(addContactPageHeader);
      });

    const userData = generateContactData();

      await attach.withAllureStep(page, 'Step 4 - Fill in Credentials for New Contact', async () => {
      await reusableScripts.enterAddContactCredentials(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.birthdate,
        userData.phone,
        userData.street1,
        userData.street2,
        userData.city,
        userData.stateProvince,
        userData.postalCode,
        userData.country
        );
      });

      await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
        await addContactPage.clickSubmit();
      });

      await attach.withAllureStep(page, 'Step 5 - Verify Contact List Page Header', async () => {
        const result = await contactListPage.verifyContactListHeader();
        expect(result).toBe(contactListPageHeader);
      });

      if (testCase.displayUserDetails) {
          await attach.withAllureStep(page, 'Step 6 - Click Added Contact by Name', async () => {
              await contactListPage.clickContactByName(userData.firstName + ' ' + userData.lastName);
        });
        
        await attach.withAllureStep(page, 'Step 7 - Verify Contact Details Page', async () => {
            const result = await contactDetailsPage.verifyContactDetailsHeader();
            expect(result).toBe(contactDetailsPageHeader);
        });
        
        await attach.withAllureStep(page, 'Step 8 - Verify Added Contact Details', async () => {
            await expect(await contactDetailsPage.getFirstNameLocator(userData.firstName)).toBeVisible();
            await expect(await contactDetailsPage.getLastNameLocator(userData.lastName)).toBeVisible();
            await expect(await contactDetailsPage.getEmailLocator(userData.email)).toBeVisible();
            await expect(await contactDetailsPage.getBirthdateLocator(userData.birthdate)).toBeVisible();
            await expect(await contactDetailsPage.getPhoneLocator(userData.phone)).toBeVisible();
            await expect(await contactDetailsPage.getStreet1Locator(userData.street1)).toBeVisible();
            await expect(await contactDetailsPage.getStreet2Locator(userData.street2)).toBeVisible();
            await expect(await contactDetailsPage.getCityLocator(userData.city)).toBeVisible();
            await expect(await contactDetailsPage.getStateProvinceLocator(userData.stateProvince)).toBeVisible();
            await expect(await contactDetailsPage.getPostalCodeLocator(userData.postalCode)).toBeVisible();
            await expect(await contactDetailsPage.getCountryLocator(userData.country)).toBeVisible();
        });
    } else {
        await attach.withAllureStep(page, 'Step 6 - Verify Added Contact', async () => {
            expect(contactListPageHeaderTxt).toBe(contactListPageHeader);
            await expect(page.getByText(`${userData.firstName} ${userData.lastName}`)).toBeVisible();
        });
      }
    });
  }
});
