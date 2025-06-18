// config/index.ts

import { defaultConfig } from './config';
import { devConfig } from './dev';
import { stagingConfig } from './staging';
import { prodConfig } from './prod';

interface EnvironmentConfig {
  baseUrl: string;
  timeout: number;
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
  [key: string]: any; // Allow for additional dynamic properties
}

function loadConfig(): EnvironmentConfig {
  const env = process.env.NODE_ENV || 'dev'; // Default to 'dev' if not specified

  switch (env.toLowerCase()) {
    case 'dev':
    case 'development':
      console.log(`Loading Development Configuration (${env})`);
      return devConfig;
    case 'staging':
      console.log(`Loading Staging Configuration (${env})`);
      return stagingConfig;
    case 'prod':
    case 'production':
      console.log(`Loading Production Configuration (${env})`);
      return prodConfig;
    case 'default': // Fallback if you explicitly want the base config
      console.log(`Loading Default Configuration (${env})`);
      return defaultConfig;
    default:
      console.warn(`Unknown NODE_ENV: '${env}'. Loading Development Configuration.`);
      return devConfig; // Fallback for unknown environments
  }
}

export const config = loadConfig();

// Optional: Export the interface for type safety in other files
export type { EnvironmentConfig };