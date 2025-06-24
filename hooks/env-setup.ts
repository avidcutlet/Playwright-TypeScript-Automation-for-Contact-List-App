// hooks/global-setup.ts
import * as dotenv from 'dotenv';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..'); 
const env = process.env.TEST_ENV || 'staging';
const envFilePath = path.resolve(projectRoot, 'config', `.env.${env}`); 
// Load the appropriate .env file
const result = dotenv.config({ path: envFilePath });

// --- Extensive Debugging ---
console.log(`Attempting to load .env from: ${envFilePath}`);

if (result.error) {
  console.error('dotenv error:', result.error);
} else {
  console.log('dotenv parsed variables:', result.parsed);
}

console.log('BASE_URL from process.env AFTER dotenv:', process.env.BASE_URL);
console.log('API_BASE_URL from process.env AFTER dotenv:', process.env.API_BASE_URL);
console.log('ADMIN_USERNAME from process.env AFTER dotenv:', process.env.ADMIN_USERNAME);
console.log('ADMIN_PASSWORD from process.env AFTER dotenv:', process.env.ADMIN_PASSWORD);
// --- End Extensive Debugging ---

async function globalSetup() {
  console.log('Executing global setup...');

  // setup logic here, e.g., login, create a user, etc.
}

export default globalSetup;