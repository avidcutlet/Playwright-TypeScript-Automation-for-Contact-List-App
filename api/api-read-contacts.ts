import axios from 'axios';
import fs from 'fs';
import path from 'path';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';

const loggingUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// Get contact list function
export async function getContactList(authToken: string): Promise<{ responseData: string; responseStatus: string}> {
  try {
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface GetContactList {
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
    
    const response = await CONTACT_LIST.get<GetContactList>('/contacts', {
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

// Get contact list function
export async function getSpecificContact(authToken: string, contactId: string): Promise<{ responseData: string; responseStatus: string}> {
  try {
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface GetContactList {
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
    
    const response = await CONTACT_LIST.get<GetContactList>(`/contacts/${contactId}`, {
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
