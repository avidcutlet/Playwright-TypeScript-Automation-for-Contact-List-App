import { Page, Locator } from '@playwright/test';

import { ElementKeyboardActionUtil } from '@utils/element-keyboard-action-util';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class AddContactPage {
    private page: Page;
    private elementKeyboardActionUtil: ElementKeyboardActionUtil;
    private elementMouseActionUtil: ElementMouseActionUtil;

    private addContactHeader: Locator;
    private firstNameTxt: Locator;
    private lastNameTxt: Locator;
    private birthdateTxt: Locator;
    private emailTxt: Locator;
    private phoneTxt: Locator;
    private street1Txt: Locator;
    private street2Txt: Locator;
    private cityTxt: Locator;
    private stateProvinceTxt: Locator;
    private postalCodeTxt: Locator;
    private countryTxt: Locator;
    private submitBtn: Locator;
    private cancelBtn: Locator;
    private errorMessage: Locator;
    
    private addContactURLRegex: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.addContactHeader = page.getByRole('heading', { name: 'Add Contact' });
        this.firstNameTxt = page.getByRole('textbox', { name: '* First Name:' });
        this.lastNameTxt = page.getByRole('textbox', { name: '* Last Name:' });
        this.birthdateTxt = page.getByRole('textbox', { name: 'Date of Birth:' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email:' });
        this.phoneTxt = page.getByRole('textbox', { name: 'Phone:' });
        this.street1Txt = page.getByRole('textbox', { name: 'Street Address 1:' });
        this.street2Txt = page.getByRole('textbox', { name: 'Street Address 2:' });
        this.cityTxt = page.getByRole('textbox', { name: 'City:' });
        this.stateProvinceTxt = page.getByRole('textbox', { name: 'State or Province:' });
        this.postalCodeTxt = page.getByRole('textbox', { name: 'Postal Code:' });
        this.countryTxt = page.getByRole('textbox', { name: 'Country:' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = page.getByText('Contact validation failed:');

        this.addContactURLRegex = /.*\/addContact/;
    }

    // Return Add Contact Header Text
    async verifyAddContactHeader(): Promise<string | null> {
        return this.addContactHeader.textContent();
    }

    // Wait for the URL to contain '/addContact'
    async waitForAddContactPageLoad(): Promise<void> {
      await this.page.waitForURL(this.addContactURLRegex);
    }

    // Input firstname
    async enterFirstName(firstName: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.firstNameTxt, firstName);
    }

    // Input lastname
    async enterLastName(lastName: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.lastNameTxt, lastName);
    }

    // Input birthdate
    async enterBirthdate(birthdate: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.birthdateTxt, birthdate);
    }

    // Input email
    async enterEmail(email: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    // Input phone
    async enterPhone(phone: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.phoneTxt, phone);
    }

    // Input street1
    async enterStreet1(street1: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.street1Txt, street1);
    }

    // Input street2
    async enterStreet2(street2: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.street2Txt, street2);
    }

    // Input city
    async enterCity(city: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.cityTxt, city);
    }

    // Input state or province
    async enterStateProvince(stateProvince: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.stateProvinceTxt, stateProvince);
    }

    // Input postal code
    async enterPostalCode(postalCode: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.postalCodeTxt, postalCode);
    }

    // Input country
    async enterCountry(country: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.countryTxt, country);
    }

    // Return error message
    async verifyErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }

    // Click submit
    async clickSubmit() {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    // Click cancel
    async clickCancel() {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }
}