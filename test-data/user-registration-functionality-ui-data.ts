export interface UserRegUITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectedHeader?: string;
  expectedErrorKey?: string;
  expectError: boolean;
  isDynamicError?: boolean;
}

export const userRegUITestCases: UserRegUITestCase[] = [
  {
    name: 'TC1 - Successful User Registration',
    subSuite: 'Successful User Registration',
    displayName: 'Add New User - Success',
    testDataKey: 'faker',
    expectedHeader: 'ContactListPageHeader',
    expectError: false,
  },
  {
    name: 'TC2 - Registration with Existing Email',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegExistingEmail',
    expectedErrorKey: 'existingEmail',
    expectError: true,
  },
  {
    name: 'TC3 - Missing Mandatory Field (First Name)',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegEmptyFirstName',
    expectedErrorKey: 'userRegEmptyFirstName',
    expectError: true,
  },
  {
    name: 'TC4 - First Name exceeds 20 chars',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegExceedFirstNameLimit',
    expectedErrorKey: 'userRegExceedFirstNameLimit',
    expectError: true,
    isDynamicError: true,
  },
  {
    name: 'TC5 - Invalid Email Format',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegInvalidEmail',
    expectedErrorKey: 'userRegInvalidEmail',
    expectError: true,
  },
];
