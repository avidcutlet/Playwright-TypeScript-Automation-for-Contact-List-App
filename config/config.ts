// config/config.ts

interface AppConfig {
  baseUrl: string;
  timeout: number; // Default timeout for tests/actions
  users: {
    admin: { username: string; password: string };
  };
  api: {
    baseUrl: string;
    endpoints: {
      login: string;
      logout: string;
      addUser: string;
      user: string; 
      contactList: string;
      contact: string;

    };
  };
  // Add any other common configuration properties here
}

export const defaultConfig: AppConfig = {
  baseUrl: 'https://thinking-tester-contact-list.herokuapp.com', // Default local development URL
  timeout: 30000, // 30 seconds
  users: {
    admin: { username: 'vonwebster@gmail.com', password: 'pass123' },
  },
  api: {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    endpoints: {
      /** Endpoints for Users **/
      login: '/users/login',
      logout: '/users/logout',
      addUser: '/users',

      //   Endpoint for Read, Update, and Delete
      user: '/users/me',
      
      /** Endpoints for Contacts **/

      // Contact List
      contactList: '/contacts',

      // Endpoint for Read Contact, Update, and Delete
      contact: '/contacts/',

    },
  },
};