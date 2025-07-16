import { Page, Locator } from '@playwright/test';

import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class ContactDetailsPage {
    private elementMouseActionUtil: ElementMouseActionUtil;

    private contactDetailsHeader: Locator;
    private editContactBtn: Locator;
    private deleteContactBtn: Locator;
    private returnBtn: Locator;
    private firstNameSiblingLbl: Locator;
    private lastNameSiblingLbl: Locator;
    private birthdateSiblingLbl: Locator;
    private emailSiblingLbl: Locator;
    private phoneSiblingLbl: Locator;
    private street1SiblingLbl: Locator;
    private street2SiblingLbl: Locator;
    private citySiblingLbl: Locator;
    private stateProvinceSiblingLbl: Locator;
    private postalCodeSiblingLbl: Locator;
    private countrySiblingLbl: Locator;

    constructor(page: Page) {
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.contactDetailsHeader = page.getByRole('heading', { name: 'Contact Details' });
        this.editContactBtn = page.getByRole('button', { name: 'Edit Contact' });
        this.deleteContactBtn = page.getByRole('button', { name: 'Delete Contact' });
        this.returnBtn = page.getByRole('button', { name: 'Return to Contact List' });
        this.firstNameSiblingLbl = page.locator('p').filter({ hasText: 'First Name:' });
        this.lastNameSiblingLbl = page.locator('p').filter({ hasText: 'Last Name:' });
        this.birthdateSiblingLbl = page.locator('p').filter({ hasText: 'Date of Birth:' });
        this.emailSiblingLbl = page.locator('p').filter({ hasText: 'Email:' });
        this.phoneSiblingLbl = page.locator('p').filter({ hasText: 'Phone:' });
        this.street1SiblingLbl = page.locator('p').filter({ hasText: 'Street Address 1:' });
        this.street2SiblingLbl = page.locator('p').filter({ hasText: 'Street Address 2:' });
        this.citySiblingLbl = page.locator('p').filter({ hasText: 'City:' });
        this.stateProvinceSiblingLbl = page.locator('p').filter({ hasText: 'State or Province:' });
        this.postalCodeSiblingLbl = page.locator('p').filter({ hasText: 'Postal Code:' });
        this.countrySiblingLbl = page.locator('p').filter({ hasText: 'Country:' });
    }

    // Return contact details header text
    async verifyContactDetailsHeader(): Promise<string | null> {
        return this.contactDetailsHeader.textContent();
    }

    // Click edit contact
    async clickEditContact(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.editContactBtn);
    }

    // Click delete contact
    async clickDeleteContact(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.deleteContactBtn);
    }

    // Click return button
    async clickReturn(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.returnBtn);
    }

    // Return Firstname sibling locator
    async getFirstNameLocator(firstName: string): Promise<Locator> {
        return this.firstNameSiblingLbl.getByText(`${firstName}`);
    }

    // Return Lastname sibling locator
    async getLastNameLocator(lastName: string): Promise<Locator> {
        return this.lastNameSiblingLbl.getByText(`${lastName}`);
    }

    // Return Birthdate sibling locator
    async getBirthdateLocator(birthdate: string): Promise<Locator> {
        return this.birthdateSiblingLbl.getByText(`${birthdate}`);
    }

    // Return Email locator
    async getEmailLocator(email: string): Promise<Locator> {
        return this.emailSiblingLbl.getByText(`${email}`);
    }

    // Return Phone locator
    async getPhoneLocator(phone: string): Promise<Locator> {
        return this.phoneSiblingLbl.getByText(`${phone}`);
    }

    // Return Street1 locator
    async getStreet1Locator(street1: string): Promise<Locator> {
        return this.street1SiblingLbl.getByText(`${street1}`);
    }

    // Return Street2 locator
    async getStreet2Locator(street2: string): Promise<Locator> {
        return this.street2SiblingLbl.getByText(`${street2}`);
    }

    // Return City locator
    async getCityLocator(city: string): Promise<Locator> {
        return this.citySiblingLbl.getByText(`${city}`);
    }

    // Return StateProvince locator
    async getStateProvinceLocator(stateProvince: string): Promise<Locator> {
        return this.stateProvinceSiblingLbl.getByText(`${stateProvince}`);
    }

    // Return PostalCode locator
    async getPostalCodeLocator(postalCode: string): Promise<Locator> {
        return this.postalCodeSiblingLbl.getByText(`${postalCode}`);
    }

    // Return Country locator
    async getCountryLocator(country: string): Promise<Locator> {
        return this.countrySiblingLbl.getByText(`${country}`);
    }
}