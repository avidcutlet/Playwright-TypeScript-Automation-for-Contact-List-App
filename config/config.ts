export const defaultConfig = {
  baseUrl: process.env.BASE_URL, // Will be overridden by environment-specific config or .env
  timeout: process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT) : 30000,
  users: {
    admin: { 
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD }, // Will be overridden
  },
  api: {
    baseUrl: process.env.API_BASE_URL, // Will be overridden
  },
  performanceLogging: process.env.PERFORMANCE_LOGGING === 'true',
};
console.log('defaultConfig loaded:', defaultConfig);