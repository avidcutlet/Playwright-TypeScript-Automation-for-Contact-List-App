import { Page } from '@playwright/test';

import { AddContactPage } from '@pages/add-contact-page';
import { LoginPage } from '@pages/login-page';
import { SignUpPage } from '@pages/sign-up-page';

export class ReusableHelpers {
    private addContactPageInstance: AddContactPage;
    private loginPageInstance: LoginPage;
    private signUpPageInstance: SignUpPage;

    constructor(page: Page) {
        this.addContactPageInstance = new AddContactPage(page);
        this.loginPageInstance = new LoginPage(page);
        this.signUpPageInstance = new SignUpPage(page);
    }

    // Fill in login fields
    async enterLoginCredentials(email: string, password: string): Promise<void> {
        await this.loginPageInstance.enterEmail(email);
        await this.loginPageInstance.enterPassword(password);
    }

    // Fill in add contact fields
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
        await this.addContactPageInstance.enterFirstName(firstName);
        await this.addContactPageInstance.enterLastName(lastName);
        await this.addContactPageInstance.enterBirthdate(birthday);
        await this.addContactPageInstance.enterEmail(email);
        await this.addContactPageInstance.enterPhone(phone);
        await this.addContactPageInstance.enterStreet1(address1);
        await this.addContactPageInstance.enterStreet2(address2);
        await this.addContactPageInstance.enterCity(city);
        await this.addContactPageInstance.enterStateProvince(state);
        await this.addContactPageInstance.enterPostalCode(postalCode);
        await this.addContactPageInstance.enterCountry(country);
    }

    // Fill in sign up fields
    async enterSignUpCredentials(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.signUpPageInstance.enterFirstName(firstName);
        await this.signUpPageInstance.enterLastName(lastName);
        await this.signUpPageInstance.enterEmail(email);
        await this.signUpPageInstance.enterPassword(password);
    }
}