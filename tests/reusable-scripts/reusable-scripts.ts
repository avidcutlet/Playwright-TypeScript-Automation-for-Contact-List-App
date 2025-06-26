import { Page, Locator } from '@playwright/test';

import { LoginPage } from '@pages/login-page';
import { ContactListPage } from '@pages/contact-list-page';
import { AddContactPage } from '@pages/add-contact-page';
import { SignUpPage } from '@pages/sign-up-page';
import { ElementWaitUtil } from '@utils/element-wait-util';
import DatasetUtil from '@utils/test-data-util';

const DATASET_UI = new DatasetUtil('ui');

export class ReusableHelpers {
    private page: Page;
    private elementWaitUtil: ElementWaitUtil;
    private loginPageInstance: LoginPage;
    private addUserPageInstance: SignUpPage;
    private contactListPageInstance: ContactListPage;
    private addContactPageInstance: AddContactPage;
    private signUpPageInstance: SignUpPage;

    constructor(page: Page) {
        this.page = page;
        this.elementWaitUtil = new ElementWaitUtil(page);
        this.loginPageInstance = new LoginPage(page);
        this.addUserPageInstance = new SignUpPage(page);
        this.contactListPageInstance = new ContactListPage(page);
        this.addContactPageInstance = new AddContactPage(page);
        this.signUpPageInstance = new SignUpPage(page);
    }

    async enterLoginCredentials(email: string, password: string): Promise<void> {
        await this.loginPageInstance.enterEmail(email);
        await this.loginPageInstance.enterPassword(password);
    }
    
    async loginAndVerify(email: string, password: string): Promise<Locator> {
        await this.loginPageInstance.enterEmail(email);
        await this.loginPageInstance.enterPassword(password);
        await this.loginPageInstance.clickSubmit();
        return this.contactListPageInstance.verifyContactListHeader();
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

    async addContactAndVerify(
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
    ): Promise<Locator> {
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
        await this.addContactPageInstance.clickSubmit();
        return this.contactListPageInstance.verifyContactListHeader();
    }

    async enterSignUpCredentials(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.signUpPageInstance.enterFirstName(firstName);
        await this.signUpPageInstance.enterLastName(lastName);
        await this.signUpPageInstance.enterEmail(email);
        await this.signUpPageInstance.enterPassword(password);
    }

    async signUpAndVerify(firstName: string, lastName: string, email: string, password: string): Promise<Locator> {
        const LOGIN_PAGE_HEADER_LOCATOR = await this.loginPageInstance.verifyLoginHeader();
        await this.elementWaitUtil.waitForElement(LOGIN_PAGE_HEADER_LOCATOR, 'visible');
        await this.loginPageInstance.clickSignUp();
        const SIGN_UP_PAGE_HEADER_LOCATOR = await this.addUserPageInstance.verifyAddUserHeader();
        await this.elementWaitUtil.waitForElement(SIGN_UP_PAGE_HEADER_LOCATOR, 'visible');
        await this.signUpPageInstance.enterFirstName(firstName);
        await this.signUpPageInstance.enterLastName(lastName);
        await this.signUpPageInstance.enterEmail(email);
        await this.signUpPageInstance.enterPassword(password);
        await this.signUpPageInstance.clickSubmit();
        const contactListHeader = this.contactListPageInstance.verifyContactListHeader();
        return contactListHeader;
    }
}