import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { ContactListPage } from '@pages/contact-list-page';
import { EditContactPage } from '@pages/edit-contact-page';
import { ContactDetailsPage } from '@pages/contact-details-page';
import { editContactTestCases } from '@testData/edit-contact-functionality-data';
import { generateContactData } from '@testData/test-data-generator';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Edit Contact functionality via UI @Regression @ALL @TS4 @UI @tagToSkipInProd3', () => {
  for (const testCase of editContactTestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("UI");

      const contactListPage = new ContactListPage(page);
      const contactDetailsPage = new ContactDetailsPage(page);
      const editContactPage = new EditContactPage(page);
      const reusableScripts = new ReusableHelpers(page);
      
      const fakerData = generateContactData();
      const editContactPageHeader: string = dataSetUI.getTestData('Header', 'EditContactPageHeader');
      const contactDetailsPageHeader: string = dataSetUI.getTestData('Header', 'ContactDetailsPageHeader');
      
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
      await contactListPage.clickContactByName(fakerData.firstName + ' ' + fakerData.lastName);
      
      await attach.withAllureStep(page, 'Step 1 - Click Edit Contact', async () => {
        await contactDetailsPage.clickEditContact();
      });

      const userData = {
        firstName: dataSetUI.getTestData(testCase.testDataKey, 'firstName'),
        lastName: dataSetUI.getTestData(testCase.testDataKey, 'lastName'),
        birthdate: dataSetUI.getTestData(testCase.testDataKey, 'birthdate'),
        email: dataSetUI.getTestData(testCase.testDataKey, 'email'),
        phone: dataSetUI.getTestData(testCase.testDataKey, 'phone'),
        street1: dataSetUI.getTestData(testCase.testDataKey, 'street1'),
        street2: dataSetUI.getTestData(testCase.testDataKey, 'street2'),
        city: dataSetUI.getTestData(testCase.testDataKey, 'city'),
        stateProvince: dataSetUI.getTestData(testCase.testDataKey, 'stateProvince'),
        postalCode: dataSetUI.getTestData(testCase.testDataKey, 'postalCode'),
        country: dataSetUI.getTestData(testCase.testDataKey, 'country')
      }
      
      await attach.withAllureStep(page, 'Step 2 - Modify fields', async () => {
        const result = await editContactPage.verifyEditContactHeader();
        expect(result).toBe(editContactPageHeader);

        await editContactPage.removeText(dataSetUI.getTestData('Fields', "firstName"));
        await editContactPage.enterFirstName(userData.firstName);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "lastName"));
        await editContactPage.enterLastName(userData.lastName);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "birthdate"));
        await editContactPage.enterBirthdate(userData.birthdate);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "email"));
        await editContactPage.enterEmail(userData.email);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "phone"));
        await editContactPage.enterPhone(userData.phone);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "street1"));
        await editContactPage.enterStreet1(userData.street1);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "street2"));
        await editContactPage.enterStreet2(userData.street2);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "city"));
        await editContactPage.enterCity(userData.city);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "stateProvince"));
        await editContactPage.enterStateProvince(userData.stateProvince);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "postalCode"));
        await editContactPage.enterPostalCode(userData.postalCode);
        await editContactPage.removeText(dataSetUI.getTestData('Fields', "country"));
        await editContactPage.enterCountry(userData.country);
      });

      await attach.withAllureStep(page, 'Step 3 - Click Submit', async () => {
        await editContactPage.clickSubmit();
      });

      if (!testCase.expectError) {
        await attach.withAllureStep(page, 'Step 4 - Verify Succesful Update', async () => {
          const result = await contactDetailsPage.verifyContactDetailsHeader();
          expect(result).toBe(contactDetailsPageHeader);

          await expect(await contactDetailsPage.getFirstNameLocator(userData.firstName)).toBeVisible();
          await expect(await contactDetailsPage.getLastNameLocator(userData.lastName)).toBeVisible();
          await expect(await contactDetailsPage.getBirthdateLocator(userData.birthdate)).toBeVisible();
          await expect(await contactDetailsPage.getEmailLocator(userData.email)).toBeVisible();
          await expect(await contactDetailsPage.getPhoneLocator(userData.phone)).toBeVisible();
          await expect(await contactDetailsPage.getStreet1Locator(userData.street1)).toBeVisible();
          await expect(await contactDetailsPage.getStreet2Locator(userData.street2)).toBeVisible();
          await expect(await contactDetailsPage.getCityLocator(userData.city)).toBeVisible();
          await expect(await contactDetailsPage.getStateProvinceLocator(userData.stateProvince)).toBeVisible();
          await expect(await contactDetailsPage.getPostalCodeLocator(userData.postalCode)).toBeVisible();
          await expect(await contactDetailsPage.getCountryLocator(userData.country)).toBeVisible();
        });
      } else {
        const expectedError = dataSetUI.getTestData('ErrorMessage', testCase.expectedErrorKey!);
        
        await attach.withAllureStep(page, 'Step 4 - Verify Error Message Displayed', async () => {
          
          const actualError = await editContactPage.verifyErrorMessage();
          if (testCase.isDynamicError) {
            const expected = expectedError.replace('{VALUE}', userData.firstName);
            expect(actualError).toBe(expected);
            
          } else {
            expect(actualError).toBe(expectedError);
          }
        });
      }
    });
  }
});
