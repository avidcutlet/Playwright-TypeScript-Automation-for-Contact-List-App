import { Page, expect } from '@playwright/test';

import { AddContactPage } from '@pages/add-contact-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';
import DatasetUtil from '@utils/test-data-util';
import { ContactListPage } from '@pages/contact-list-page';

const dataSetUI = new DatasetUtil('ui');

export class ReusableHelpers {
    private contactListPage: ContactListPage
    private addContactPage: AddContactPage;
    private loginPage: LoginPage;
    private signUpPage: SignUpPage;

    private contactListPageHeader: string;
    private addContactPageHeader: string;

    constructor(page: Page) {
      this.contactListPage = new ContactListPage(page);
      this.addContactPage = new AddContactPage(page);
      this.loginPage = new LoginPage(page);
      this.signUpPage = new SignUpPage(page);

      this.contactListPageHeader = dataSetUI.getTestData('Header', 'ContactListPageHeader');
      this.addContactPageHeader = dataSetUI.getTestData('Header', 'AddContactPageHeader');
    }

    // Fill in login fields, and verify successful login
    async loginUser(email: string, password: string): Promise<void> {
      await this.loginPage.enterEmail(email);
      await this.loginPage.enterPassword(password);
      await this.loginPage.clickSubmit();
      const result = await this.contactListPage.verifyContactListHeader();
      expect(result).toBe(this.contactListPageHeader);
    }
    
    // Go to add contact page, fill in add contact fields, and verify successful adding of contact
    async addNewContact(
      firstName: string,
      lastName: string,
      birthdate: string,
      email: string,
        phone: string,
        street1: string,
        street2: string,
        city: string,
        stateProvince: string,
        postalCode: string,
        country: string
      ): Promise<void> {
        await this.contactListPage.clickAddContact();
        const addContactPageHeaderTxt = await this.addContactPage.verifyAddContactHeader();
        expect(addContactPageHeaderTxt).toBe(this.addContactPageHeader);
        await this.addContactPage.enterFirstName(firstName);
        await this.addContactPage.enterLastName(lastName);
        await this.addContactPage.enterBirthdate(birthdate);
        await this.addContactPage.enterEmail(email);
        await this.addContactPage.enterPhone(phone);
        await this.addContactPage.enterStreet1(street1);
        await this.addContactPage.enterStreet2(street2);
        await this.addContactPage.enterCity(city);
        await this.addContactPage.enterStateProvince(stateProvince);
        await this.addContactPage.enterPostalCode(postalCode);
        await this.addContactPage.enterCountry(country);
        await this.addContactPage.clickSubmit();
        const result = await this.contactListPage.verifyContactListHeader();
        expect(result).toBe(this.contactListPageHeader);
      }
      
      // Go to sign up page, fill in sign up fields, and verify successful sign up
      async signUpUser(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.loginPage.clickSignUp();
        await this.signUpPage.enterFirstName(firstName);
        await this.signUpPage.enterLastName(lastName);
        await this.signUpPage.enterEmail(email);
        await this.signUpPage.enterPassword(password);
        await this.signUpPage.clickSubmit();
        const result = await this.contactListPage.verifyContactListHeader();
        expect(result).toBe(this.contactListPageHeader);
      }
    }