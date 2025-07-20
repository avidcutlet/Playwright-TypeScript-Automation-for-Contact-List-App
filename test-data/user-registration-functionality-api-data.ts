export interface UserRegAPITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectedHeader?: string;
  expectedErrorKey?: string;
  expectError: boolean;
  isDynamicError?: boolean;
}

export const userRegAPITestCases: UserRegAPITestCase[] = [
  {
    name: 'TC19 - Successful User Registration via API',
    subSuite: 'Successful User Registration',
    displayName: 'Add New User - Success',
    testDataKey: 'faker',
    expectedHeader: 'ContactListPageHeader',
    expectError: false,
  },
  {
    name: 'TC20 - Registration with Existing Email via API',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegExistingEmail',
    expectedErrorKey: 'existingEmail',
    expectError: true,
  },
  {
    name: 'TC21 - Missing Mandatory Field (First Name) via API',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegEmptyFirstName',
    expectedErrorKey: 'userRegEmptyFirstName',
    expectError: true,
  },
  {
    name: 'TC22 - First Name exceeds 20 chars via API',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegExceedFirstNameLimit',
    expectedErrorKey: 'userRegExceedFirstNameLimit',
    expectError: true,
    isDynamicError: true,
  },
  {
    name: 'TC23 - Invalid Email Format via API',
    subSuite: 'Unsuccessful User Registration',
    displayName: 'Add New User - Unsuccess',
    testDataKey: 'UserRegInvalidEmail',
    expectedErrorKey: 'userRegInvalidEmail',
    expectError: true,
  },
];
