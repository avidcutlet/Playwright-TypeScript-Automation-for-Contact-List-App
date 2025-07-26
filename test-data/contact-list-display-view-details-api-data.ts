export interface getContactAPITestCase {
  name: string;
  subSuite: string;
  displayName: string;
  isContactList: boolean;
}

export const getContactAPITestCases: getContactAPITestCase[] = [
  {
    name: 'TC32 - Verify successful retrieval of contact list via API',
    subSuite: 'Successful Read Contact List',
    displayName: 'Read Contact - Success',
    isContactList: true,
  },
  {
    name: 'TC33 - Verify successful retrieval of a specific contact via API',
    subSuite: 'Successful Read Specific Contact',
    displayName: 'Read Contact - Success',
    isContactList: false,
  },
];
