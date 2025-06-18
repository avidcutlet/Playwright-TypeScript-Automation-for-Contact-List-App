// config/dev.ts
import { defaultConfig } from './config';

export const devConfig = {
  ...defaultConfig, // Inherit all default settings
  baseUrl: 'https://thinking-dev-contact-list.herokuapp.com', // Override base URL for dev
  timeout: 45000, // Maybe dev is slower, give more timeout
  users: {
    ...defaultConfig.users, // Inherit default users
    admin: { username: 'vonwebster@gmail.com', password: 'pass123' }, // Override admin for dev
  },
  api: {
    ...defaultConfig.api,
    baseUrl: 'https://thinking-dev-contact-list.herokuapp.com', // Override API base URL
  },
  // Add any dev-specific settings here
  debugMode: true,
};