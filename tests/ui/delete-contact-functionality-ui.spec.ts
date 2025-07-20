import { test, expect } from '@playwright/test';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { initializeTestHooks } from '@hooks/web-hook';

import { ContactDetailsPage } from '@pages/contact-details-page';
import { ContactListPage } from '@pages/contact-list-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { deleteContactTestCases } from '@testData/delete-contact-functionality-data';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const datasetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Delete Contact functionality via UI @Regression @ALL @UI @TS5', () => {
  for (const testCase of deleteContactTestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("UI");

      const contactListPage = new ContactListPage(page);
      const contactDetailsPage = new ContactDetailsPage(page);
      const reusableScripts = new ReusableHelpers(page);
      
      const contactDetailsPageHeader: string = datasetUI.getTestData('Header', 'ContactDetailsPageHeader');
      const fakerData = generateContactData();
      
      await reusableScripts.signUpUser(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );

      await reusableScripts.addNewContact(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.birthdate,
        fakerData.email,
        fakerData.phone,
        fakerData.street1,
        fakerData.street2,
        fakerData.city,
        fakerData.stateProvince,
        fakerData.postalCode,
        fakerData.country
        );

      await attach.withAllureStep(page, 'Step 1 - Select a Contact from the list', async () => {
        await contactListPage.clickContactByName(fakerData.firstName + ' ' + fakerData.lastName);
      });

      await attach.withAllureStep(page, 'Step 2 - User is on the Contact Details Page', async () => {
        const result = await contactDetailsPage.verifyContactDetailsHeader();
        expect(result).toBe(contactDetailsPageHeader);
      });

      if(!testCase.cancel){
        await attach.withAllureStep(page, 'Step 3 - Click Delete Contact Button', async () => {
          page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you want to delete this contact?');
            await dialog.accept();
          });
          await contactDetailsPage.clickDeleteContact();
        });
        
        await attach.withAllureStep(page, 'Step 4 - Verify Contact is deleted from the list', async () => {
          await expect(page.getByText(`${fakerData.firstName} ${fakerData.lastName}`)).not.toBeVisible();
        });
      } else {
        await attach.withAllureStep(page, 'Step 3 - Click Delete Contact Button', async () => {
          page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you want to delete this contact?');
            await dialog.dismiss();
          });
          await contactDetailsPage.clickDeleteContact();
        });
        
        await attach.withAllureStep(page, 'Step 4 - Verify Contact is not deleted from the list', async () => {
          await expect(await contactDetailsPage.getFirstNameLocator(fakerData.firstName)).toBeVisible();
          await expect(await contactDetailsPage.getLastNameLocator(fakerData.lastName)).toBeVisible();
          await expect(await contactDetailsPage.getEmailLocator(fakerData.email)).toBeVisible();
          await expect(await contactDetailsPage.getBirthdateLocator(fakerData.birthdate)).toBeVisible();
          await expect(await contactDetailsPage.getPhoneLocator(fakerData.phone)).toBeVisible();
          await expect(await contactDetailsPage.getStreet1Locator(fakerData.street1)).toBeVisible();
          await expect(await contactDetailsPage.getStreet2Locator(fakerData.street2)).toBeVisible();
          await expect(await contactDetailsPage.getCityLocator(fakerData.city)).toBeVisible();
          await expect(await contactDetailsPage.getStateProvinceLocator(fakerData.stateProvince)).toBeVisible();
          await expect(await contactDetailsPage.getPostalCodeLocator(fakerData.postalCode)).toBeVisible();
          await expect(await contactDetailsPage.getCountryLocator(fakerData.country)).toBeVisible();
        });
      }
    });
  }
});