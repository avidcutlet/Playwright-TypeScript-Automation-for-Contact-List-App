// config/staging.ts
import { defaultConfig } from './config';

export const stagingConfig = {
  ...defaultConfig,
  baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
  timeout: 60000,
  users: {
    ...defaultConfig.users,
    admin: { username: 'vonwebster@gmail.com', password: 'pass123' },
  },
  api: {
    ...defaultConfig.api,
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
  },
  // Add any staging-specific settings here
  performanceLogging: true,
};