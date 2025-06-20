import { defaultConfig } from '@config/config';

export const stagingConfig = {
  ...defaultConfig,
  baseUrl: process.env.BASE_URL || 'https://thinking-tester-contact-list.herokuapp.com',
  timeout: 60000,
  users: {
    ...defaultConfig.users,
    admin: {
      username: process.env.ADMIN_USERNAME || 'default_staging_user@example.com',
      password: process.env.ADMIN_PASSWORD || 'default_staging_password',
    },
  },
  api: {
    ...defaultConfig.api,
    baseUrl: process.env.API_BASE_URL || 'https://thinking-tester-contact-list.herokuapp.com',
  },
  performanceLogging: true,
};