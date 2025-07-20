export interface DeleteContactTestCases {
  name: string;
  subSuite: string;
  displayName: string;
  cancel: boolean;
}

export const deleteContactTestCases: DeleteContactTestCases[] = [
  {
    name: 'TC16 - Verify successful deletion of a contact',
    subSuite: 'Successful Contact Deletion',
    displayName: 'Delete Contact - Success',
    cancel: false,
  },
  {
    name: 'TC17 - Verify successful cancellation of contact deletion',
    subSuite: 'Successful View Contact',
    displayName: 'View Full Details of Add New Contact - Success',
    cancel: true,
  },
];
