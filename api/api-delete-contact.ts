import axios from 'axios';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';

const loggingUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// Contact ID Delete function
export async function deleteSpecificContact(authToken: string, contactId: string): Promise<{ responseData: string; responseStatus: string}> {
  try {
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface DeleteSpecificContact {
      message: string;
    }
    
    const response = await CONTACT_LIST.delete<DeleteSpecificContact>(`/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
      }
    });
    
    const responseData: string = JSON.stringify(response.data, null, 2);
    const responseStatus: string = JSON.stringify(response.status, null, 2);
    loggingUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);
    
    // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
    return { responseData, responseStatus };
    
  } catch (error: any) {
    loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
    throw error;
  }
}

// Invalid Contact ID Delete function
export async function deleteInvalidID(authToken: string, contactId: string): Promise<{ errorDeleteResponseData: string; errorDeleteResponseMessage: string; errorDeleteResponseStatus: string} | undefined> {
  try {

    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface DeleteSpecificContact {
      message: string;
    }
    
    await CONTACT_LIST.delete<DeleteSpecificContact>(`/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
      }
    });
    
  } catch (error: any) {
    const errorDeleteResponseMessage: string = error.response.statusText;
    const errorDeleteResponseStatus: string = JSON.stringify(error.status, null, 2);
    const errorDeleteResponseData: string = JSON.stringify({ 
      contactId,
      httpErrorMessage: error.message,
      errorMessage: errorDeleteResponseMessage,
      responseStatus: errorDeleteResponseStatus
    }, null, 2);

    loggingUtil.logMessage("info", `Invalid Contact ID Update - RESPONSE status: ${errorDeleteResponseStatus}`);
    loggingUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(errorDeleteResponseData, null, 2)}`);

    return { errorDeleteResponseData, errorDeleteResponseMessage, errorDeleteResponseStatus };
  }
}