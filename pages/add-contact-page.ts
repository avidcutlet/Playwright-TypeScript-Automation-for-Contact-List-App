import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base-page';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';
import { ElementKeyboardActionUtil } from '@utils/element-keyboard-action-util';

export class AddContactPage extends BasePage {
    protected readonly elementMouseActionUtil: ElementMouseActionUtil;
    protected readonly elementKeyboardActionUtil: ElementKeyboardActionUtil;

    protected readonly addContactHeader: Locator;
    protected readonly firstNameTxt: Locator;
    protected readonly lastNameTxt: Locator;
    protected readonly birthdateTxt: Locator;
    protected readonly emailTxt: Locator;
    protected readonly phoneTxt: Locator;
    protected readonly street1Txt: Locator;
    protected readonly street2Txt: Locator;
    protected readonly cityTxt: Locator;
    protected readonly stateProvinceTxt: Locator;
    protected readonly postalCodeTxt: Locator;
    protected readonly countryTxt: Locator;

    protected readonly submitBtn: Locator;
    protected readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page); // Call the constructor of BasePage
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);

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
        this.countryTxt = page.locator("#country");

        this.submitBtn = page.locator("#submit");
        this.cancelBtn = page.locator("#cancel");
    }

    async verifyAddContactHeader(): Promise<Locator> {
        return this.addContactHeader;
    }

    async enterFirstName(firstName: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.firstNameTxt, firstName);
    }

    async enterLastName(lastName: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.lastNameTxt, lastName);
    }

    async enterBirthdate(birthdate: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.birthdateTxt, birthdate);
    }

    async enterEmail(email: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    async enterPhone(phone: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.phoneTxt, phone);
    }

    async enterStreet1(street1: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.street1Txt, street1);
    }

    async enterStreet2(street2: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.street2Txt, street2);
    }

    async enterCity(city: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.cityTxt, city);
    }

    async enterStateProvince(stateProvince: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.stateProvinceTxt, stateProvince);
    }

    async enterPostalCode(postalCode: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.postalCodeTxt, postalCode);
    }

    async enterCountry(country: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.countryTxt, country);
    }

    async clickSubmit() {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    async clickCancel() {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }
}