import axios from 'axios';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';

const loggingUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// User Login function
export async function userLogout(authToken: string): Promise<{ logoutResponseData: string; logoutResponseStatus: string}> {
  try {
    console.log('------------auth token:', authToken);
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface LogoutResponse {
      status: string;
    }

    const response = await CONTACT_LIST.post<LogoutResponse>(
      `/users/logout`, // endpoint
      {},              // empty body
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const logoutResponseData: string = JSON.stringify(response.data, null, 2);
    const logoutResponseStatus: string = JSON.stringify(response.status, null, 2);
    loggingUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);
    
    // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
    return { logoutResponseData, logoutResponseStatus };
    
  } catch (error: any) {
    loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
    throw error;
  }
}