export interface ContactRegistrationTestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectedHeader?: string;
  expectedErrorKey?: string;
  expectError: boolean;
  isDynamicError?: boolean;
}

export const contactRegistrationTestCases: ContactRegistrationTestCase[] = [
  {
    name: 'TC6 - Verify successful adding a contact',
    subSuite: 'Successful Contact Registration',
    displayName: 'Add New Contact - Success',
    testDataKey: 'faker',
    expectedHeader: 'ContactListPageHeader',
    expectError: false,
  },
  {
    name: 'TC7 - Verify failed adding a contact with firstname field left blank',
    subSuite: 'Unsuccessful Contact Registration',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'ContactRegEmptyFirstName',
    expectedErrorKey: 'contactRegEmptyFirstName',
    expectError: true,
  },
  {
    name: 'TC8 - Verify failed adding a contact with firstname field exceeds 20 characters limit',
    subSuite: 'Unsuccessful Contact Registration',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'ContactRegExceedFirstNameLimit',
    expectedErrorKey: 'contactRegExceedFirstNameLimit',
    expectError: true,
    isDynamicError: true,
  },
  {
    name: 'TC9 - Verify failed adding a contact with invalid email format',
    subSuite: 'Unsuccessful Contact Registration',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'ContactRegInvalidEmail',
    expectedErrorKey: 'contactRegInvalidEmail',
    expectError: true,
  },
];
