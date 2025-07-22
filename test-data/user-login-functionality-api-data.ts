export interface UserLoginAPITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey?: string;
  expectedHeader?: string;
  expectedErrorKey?: string;
  expectError: boolean;
  createUser: boolean;
}

export const userLoginAPITestCases: UserLoginAPITestCase[] = [
  {
    name: 'TC24 - Successful User Login via API',
    subSuite: 'Successful User Login',
    displayName: 'Login User - Success',
    testDataKey: 'faker',
    expectedHeader: 'ContactListPageHeader',
    expectError: false,
    createUser: true,
  },
  {
    name: 'TC25 - Failed User Login with Empty Credentials via API',
    subSuite: 'Unsuccessful User Login',
    displayName: 'Login User - Unsuccess',
    testDataKey: 'UserLoginEmptyCredentials',
    expectedErrorKey: 'emptyCredentials',
    expectError: true,
    createUser: false,
  },
  {
    name: 'TC26 - Failed User Login with Incorrect Password for Valid Email via API',
    subSuite: 'Unsuccessful User Login',
    displayName: 'Login User - Unsuccess',
    expectedErrorKey: 'userLoginIncorrectPassword',
    expectError: true,
    createUser: true,
  },
];
