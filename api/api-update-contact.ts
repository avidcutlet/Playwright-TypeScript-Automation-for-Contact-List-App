import axios from 'axios';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';

const loggingUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// Update specific contact function
export async function fullUpdateSpecificContact(authToken: string, contactId: string, updatedContactData: Object): Promise<{ responseData: string; responseStatus: string}> {
  try {

    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface UpdateContactList {
      _id: string;
      firstName: string;
      lastName: string;
      birthdate: string;
      email: string;
      phone: string;
      street1: string;
      street2: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      country: string;
      owner: string;
      __v: number;
    }
    
    const response = await CONTACT_LIST.put<UpdateContactList>(`/contacts/${contactId}`, updatedContactData, {
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

// Update specific contact function
export async function partialUpdateSpecificContact(authToken: string, contactId: string, updatedContactData: Object): Promise<{ responseData: string; responseStatus: string}> {
  try {

    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface UpdateContactList {
      _id: string;
      firstName: string;
      lastName: string;
      birthdate: string;
      email: string;
      phone: string;
      street1: string;
      street2: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      country: string;
      owner: string;
      __v: number;
    }
    
    const response = await CONTACT_LIST.patch<UpdateContactList>(`/contacts/${contactId}`, updatedContactData, {
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

// Invalid Contact ID Update function
export async function updateInvalidID(authToken: string, contactId: string, updatedContactData: Object): Promise<{ errorUpdateResponseData: string; errorUpdateResponseMessage: string; errorUpdateResponseStatus: string} | undefined> {
  try {
    
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface UpdateContactList {
      _id: string;
      firstName: string;
      lastName: string;
      birthdate: string;
      email: string;
      phone: string;
      street1: string;
      street2: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      country: string;
      owner: string;
      __v: number;
    }
    
    await CONTACT_LIST.patch<UpdateContactList>(`/contacts/${contactId}`, updatedContactData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
      }
    });
    
  } catch (error: any) {
    const errorUpdateResponseMessage: string = error.response.data;
    const errorUpdateResponseStatus: string = JSON.stringify(error.status, null, 2);
    const errorUpdateResponseData: string = JSON.stringify({ 
      httpErrorMessage: error.message,
      errorMessage: errorUpdateResponseMessage,
      responseStatus: errorUpdateResponseStatus
    }, null, 2);

    loggingUtil.logMessage("info", `Invalid Contact ID Update - RESPONSE status: ${errorUpdateResponseStatus}`);
    loggingUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(errorUpdateResponseData, null, 2)}`);

    return { errorUpdateResponseData, errorUpdateResponseMessage, errorUpdateResponseStatus };
  }
}