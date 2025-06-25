import { Page } from '@playwright/test';

import { LoginPage } from '@pages/login-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { SignUpPage } from '@pages/sign-up-page';

export class ReusableHelpers {
    private page: Page;
    private loginPage: LoginPage;
    private contactListPage: ContactListPage;
    private addContactPage: AddContactPage;
    private signUpPage: SignUpPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.contactListPage = new ContactListPage(page);
        this.addContactPage = new AddContactPage(page);
        this.signUpPage = new SignUpPage(page);
    }

    async enterLoginCredentials(email: string, password: string): Promise<void> {
        await this.loginPage.enterEmail(email);
        await this.loginPage.enterPassword(password);
    }

    async enterAddContactCredentials(
        firstName: string,
        lastName: string,
        email: string,
        birthday: string,
        phone: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        postalCode: string,
        country: string
    ): Promise<void> {
        await this.addContactPage.enterFirstName(firstName);
        await this.addContactPage.enterLastName(lastName);
        await this.addContactPage.enterBirthdate(birthday);
        await this.addContactPage.enterEmail(email);
        await this.addContactPage.enterPhone(phone);
        await this.addContactPage.enterStreet1(address1);
        await this.addContactPage.enterStreet2(address2);
        await this.addContactPage.enterCity(city);
        await this.addContactPage.enterStateProvince(state);
        await this.addContactPage.enterPostalCode(postalCode);
        await this.addContactPage.enterCountry(country);
    }

    async enterSignUpCredentials(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.signUpPage.enterFirstName(firstName);
        await this.signUpPage.enterLastName(lastName);
        await this.signUpPage.enterEmail(email);
        await this.signUpPage.enterPassword(password);
    }
}