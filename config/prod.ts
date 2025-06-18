// config/prod.ts
import { defaultConfig } from './config';

export const prodConfig = {
  ...defaultConfig,
  baseUrl: 'https://thinking-prod-contact-list.herokuapp.com',
  timeout: 60000, // Production should be stable, but give a decent timeout
  users: {
    ...defaultConfig.users,
    admin: { username: 'vonwebster@gmail.com', password: 'pass123' },
  },
  api: {
    ...defaultConfig.api,
    baseUrl: 'https://thinking-prod-contact-list.herokuapp.com',
  },
  // Add any prod-specific settings here
  strictSSL: true,
};