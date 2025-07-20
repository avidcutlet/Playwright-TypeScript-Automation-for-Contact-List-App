import { test, expect } from '@playwright/test';

import { initializeTestHooks } from '@hooks/web-hook';

import AllureAttachScreenshot from '@utils/allure-report-util';
import DatasetUtil from '@utils/test-data-util';

import { AddContactPage } from '@pages/add-contact-page';
import { ContactListPage } from '@pages/contact-list-page';
import { ReusableHelpers } from '@reusableScripts/reusable-scripts';
import { generateContactData } from '@testData/test-data-generator';
import { contactRegistrationTestCases } from '@testData/add-contact-functionality-ui-data';

const { label, LabelName, displayName, feature } = require('allure-js-commons');
const dataSetUI = new DatasetUtil('ui');
const attach = new AllureAttachScreenshot();
initializeTestHooks().setupHooks();

test.describe('Verify Add Contact functionality via UI @Regression @ALL @UI @TS2 @tagToSkipInProd3', () => {
  for (const testCase of contactRegistrationTestCases) {
    test(`${testCase.name} @${testCase.name.split(' ')[0]}`, async ({ page }) => {
      await label(LabelName.SUITE, testCase.subSuite);
      await displayName(`${testCase.displayName}`);
      await feature("UI");

      const contactListPage = new ContactListPage(page);
      const addContactPage = new AddContactPage(page);
      const reusableScripts = new ReusableHelpers(page);
      
      const fakerData = generateContactData();
      const contactListPageHeader: string = dataSetUI.getTestData('Header', 'ContactListPageHeader');
      const addContactPageHeader: string = dataSetUI.getTestData('Header', 'AddContactPageHeader');
      
      await reusableScripts.signUpUser(
        fakerData.firstName,
        fakerData.lastName,
        fakerData.email,
        fakerData.password
      );
      
      await attach.withAllureStep(page, 'Step 1 - Click Add Contact Button', async () => {
        await contactListPage.clickAddContact();
      });
      
      await attach.withAllureStep(page, 'Step 2 - Verify Add Contact Page', async () => {
        const result = await addContactPage.verifyAddContactHeader();
        expect(result).toBe(addContactPageHeader);
      });

      const userData = testCase.testDataKey === 'faker'
      ? generateContactData()
      : {
          firstName: dataSetUI.getTestData(testCase.testDataKey, 'firstName'),
          lastName: dataSetUI.getTestData(testCase.testDataKey, 'lastName'),
          email: dataSetUI.getTestData(testCase.testDataKey, 'email'),
          birthdate: dataSetUI.getTestData(testCase.testDataKey, 'birthdate'),
          phone: dataSetUI.getTestData(testCase.testDataKey, 'phone'),
          street1: dataSetUI.getTestData(testCase.testDataKey, 'street1'),
          street2: dataSetUI.getTestData(testCase.testDataKey, 'street2'),
          city: dataSetUI.getTestData(testCase.testDataKey, 'city'),
          stateProvince: dataSetUI.getTestData(testCase.testDataKey, 'stateProvince'),
          postalCode: dataSetUI.getTestData(testCase.testDataKey, 'postalCode'),
          country: dataSetUI.getTestData(testCase.testDataKey, 'country')
        };

      await attach.withAllureStep(page, 'Step 3 - Fill in Credentials for New Contact', async () => {
        await addContactPage.enterFirstName(userData.firstName);
        await addContactPage.enterLastName(userData.lastName);
        await addContactPage.enterBirthdate(userData.birthdate);
        await addContactPage.enterEmail(userData.email);
        await addContactPage.enterPhone(userData.phone);
        await addContactPage.enterStreet1(userData.street1);
        await addContactPage.enterStreet2(userData.street2);
        await addContactPage.enterCity(userData.city);
        await addContactPage.enterStateProvince(userData.stateProvince);
        await addContactPage.enterPostalCode(userData.postalCode);
        await addContactPage.enterCountry(userData.country);
      });

      await attach.withAllureStep(page, 'Step 4 - Click Submit Button', async () => {
        await addContactPage.clickSubmit();
      });
      
      if (!testCase.expectError) {
        const contactListHeader = dataSetUI.getTestData('Header', testCase.expectedHeader!);

        await attach.withAllureStep(page, 'Verify Success Page Header', async () => {
          const result = await contactListPage.verifyContactListHeader();
          expect(result).toBe(contactListHeader);
        });

        await attach.withAllureStep(page, 'Verify Added Contact', async () => {
          const result = await contactListPage.verifyContactListHeader();
          expect(result).toBe(contactListPageHeader);
          await expect(page.getByText(`${userData.firstName} ${userData.lastName}`)).toBeVisible();
        });
        
      } else {
        const expectedError = dataSetUI.getTestData('ErrorMessage', testCase.expectedErrorKey!);
        
        await attach.withAllureStep(page, 'Verify Error Message Displayed', async () => {
          
          const actualError = await addContactPage.verifyErrorMessage();
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
