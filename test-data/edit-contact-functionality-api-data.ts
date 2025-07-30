export interface UpdateContactAPITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey: string;
  expectError: boolean;
}

export const updateContactAPITestCases: UpdateContactAPITestCase[] = [
  {
    name: 'TC34 - Verify successful update of a contact (PUT) via API',
    subSuite: 'Successful Contact Update',
    displayName: 'Full Update Contact - Success',
    testDataKey: 'UpdateFullContact',
    expectError: false,
  },
  {
    name: 'TC35 - Verify successful partial update of a contact (PATCH) via API',
    subSuite: 'Successful Contact Update',
    displayName: 'Partial Update Contact - Success',
    testDataKey: 'UpdatePartialContact',
    expectError: false,
  },
  {
    name: 'TC36 - Verify failed update of non-existent contact via API',
    subSuite: 'Unsuccessful Contact Update',
    displayName: 'Update Contact - Unsuccess',
    testDataKey: 'NonExistentContactID',
    expectError: true,
  },
];
