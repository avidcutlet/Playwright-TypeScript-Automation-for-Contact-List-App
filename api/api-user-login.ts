import axios, { create } from 'axios';
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

// User Login function
export async function userLogin(email: string, password: string): Promise<{ loginResponseData: string; loginResponseStatus: string}> {
  try {
    
    // Check on compile time if user's and token's properties and value of keys within those properties are all string.
    interface LoginResponse {
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        __v: number;
      };
      token: string;
    }
    
    const response = await CONTACT_LIST.post<LoginResponse>('/users/login', {
      email,
      password,
    });
    
    const loginResponseData: string = JSON.stringify(response.data, null, 2);
    const loginResponseStatus: string = JSON.stringify(response.status, null, 2);
    loggingUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);
    
    // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
    return { loginResponseData, loginResponseStatus };
    
  } catch (error: any) {
    loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
    throw error;
  }
}

// Invalid User Login function
export async function invalidUserLogin(email: string, password: string): Promise<{ errorLoginResponseData: string; errorLoginResponseMessage: string; errorLoginResponseStatus: string} | undefined> {
  try {
    
    // Check on compilte time if user's and token's properties and value of keys within those properties are all string.
    interface LoginResponse {
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        __v: number;
      };
      token: string;
    }
    
    await CONTACT_LIST.post<LoginResponse>('/users/login', {
        email,
        password,
    });
    
  } catch (error: any) {
    const errorLoginResponseMessage: string = error.response.data.message;
    const errorLoginResponseStatus: string = JSON.stringify(error.status, null, 2);
    const errorLoginResponseData: string = JSON.stringify({ 
      httpErrorMessage: error.message,
      errorMessage: errorLoginResponseMessage,
      responseStatus: errorLoginResponseStatus
    }, null, 2);

    loggingUtil.logMessage("info", `Invalid User Login - RESPONSE status: ${errorLoginResponseStatus}`);
    loggingUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(errorLoginResponseData, null, 2)}`);

    return { errorLoginResponseData, errorLoginResponseMessage, errorLoginResponseStatus };
  }
}