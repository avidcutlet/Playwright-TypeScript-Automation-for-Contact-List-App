export interface ContactListDisplayTestCases {
  name: string;
  subSuite: string;
  displayName: string;
  displayUserDetails: boolean;
}

export const contactListDisplayTestCases: ContactListDisplayTestCases[] = [
  {
    name: 'TC10 - Verify successful contact appears in the contact list',
    subSuite: 'Successful View Contact',
    displayName: 'View Added New Contact - Success',
    displayUserDetails: false,
  },
  {
    name: 'TC11 - Verify successful viewing contact details',
    subSuite: 'Successful View Contact',
    displayName: 'View Full Details of Add New Contact - Success',
    displayUserDetails: true,
  },
];
