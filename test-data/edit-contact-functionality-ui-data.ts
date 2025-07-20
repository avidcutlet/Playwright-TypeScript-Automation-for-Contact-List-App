export interface EditContactTestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectedHeader?: string;
  expectedErrorKey?: string;
  expectError: boolean;
  isDynamicError?: boolean;
}

export const editContactTestCases: EditContactTestCase[] = [
  {
    name: 'TC12 - Verify successful updating of an existing contact',
    subSuite: 'Successful Edit Contact',
    displayName: 'Edit Contact - Success',
    testDataKey: 'EditContactDetails',
    expectedHeader: 'ContactListPageHeader',
    expectError: false,
  },
  {
    name: 'TC13 - Verify failed updating of an existing contact with firstname field left blank',
    subSuite: 'Unsuccessful Edit Contact',
    displayName: 'Edit Contact - Unsuccess',
    testDataKey: 'EditContactEmptyFirstName',
    expectedErrorKey: 'editContactEmptyFirstName',
    expectError: true,
  },
  {
    name: 'TC14 - Verify failed updating of an existing contact with firstname field exceeds 20 characters limit',
    subSuite: 'Unsuccessful Edit Contact',
    displayName: 'Edit Contact - Unsuccess',
    testDataKey: 'EditContactExceedFirstNameLimit',
    expectedErrorKey: 'editContactExceedFirstNameLimit',
    expectError: true,
    isDynamicError: true,
  },
  {
    name: 'TC15 - Verify failed updating a contact with invalid email',
    subSuite: 'Unsuccessful Editt Contact',
    displayName: 'Edit Contact - Unsuccess',
    testDataKey: 'EditContactInvalidEmail',
    expectedErrorKey: 'editContactInvalidEmail',
    expectError: true,
  },
];
