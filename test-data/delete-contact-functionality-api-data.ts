export interface DeleteContactAPITestCases {
  name: string;
  subSuite: string;
  displayName: string;
  testDataKey?: string;
  success?: boolean;
}

export const deleteContactAPITestCases: DeleteContactAPITestCases[] = [
  {
    name: 'TC37 - Verify successful deletion of a contact via API',
    subSuite: 'Successful Contact Deletion',
    displayName: 'Delete Contact - Success',
    success: true,
  },
  {
    name: 'TC38 - Verify failed deletion of a non-existent contact via API',
    subSuite: 'Unsuccessful Non-existent Contact ID',
    displayName: 'Delete Non-existent Contact - Failed',
    testDataKey: 'NonExistentContactID',
  },
];
