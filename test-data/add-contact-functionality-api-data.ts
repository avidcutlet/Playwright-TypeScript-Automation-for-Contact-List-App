export interface AddContactAPITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectedErrorKey?: string;
  expectError: boolean;
  testAuthDataKey?: string;
  isInvalidAuthToken?: boolean;
}

export const addContactAPITestCases: AddContactAPITestCase[] = [
  {
    name: 'TC27 - Verify successful creation of a contact via API',
    subSuite: 'Successful Contact Creation',
    displayName: 'Add New Contact - Success',
    testDataKey: 'faker',
    expectError: false,
  },
  {
    name: 'TC28 - Verify failed contact creation with empty firstname via API',
    subSuite: 'Unsuccessful Contact Creation',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'AddContactEmptyFirstName',
    expectedErrorKey: 'addContactEmptyFirstName',
    expectError: true,
  },
  {
    name: 'TC29 - Verify failed contact creation with firstname field exceeds 20 characters limit via API',
    subSuite: 'Unsuccessful Contact Creation',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'AddContactExceedFirstNameLimit',
    expectedErrorKey: 'addContactExceedFirstNameLimit',
    expectError: true,
  },
  {
    name: 'TC30 - Verify failed contact creation with invalid email format via API',
    subSuite: 'Unsuccessful Contact Creation',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'AddContactInvalidEmail',
    expectedErrorKey: 'addContactInvalidEmail',
    expectError: true,
  },
  {
    name: 'TC31 - Verify failed contact creation without authorization token via API',
    subSuite: 'Unsuccessful Contact Creation',
    displayName: 'Add New Contact - Unsuccess',
    testDataKey: 'AddContactWithoutAuthToken',
    testAuthDataKey: 'Auth',
    expectedErrorKey: 'addContactWithoutAuthToken',
    expectError: true,
    isInvalidAuthToken: true
  },
];
