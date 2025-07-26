import axios from 'axios';
import fs from 'fs';
import path from 'path';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';
import { faker, fakerDA } from '@faker-js/faker/.';

const loggingUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// This interface allows dynamic parameters for creationOfUser function.
interface UserOpts {
  from?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

// User Creation function with dynamic parameters.
export async function creationOfUser({
  from,
  firstName,
  lastName,
  email,
  password
  }: UserOpts = {}): Promise<{ email: string, password: string, responseData: string; responseStatus: string}> {
    try {
      
      firstName = firstName ?? fakerData.firstName;
      lastName = lastName ?? fakerData.lastName;
      email = email ?? fakerData.email;
      password = password ?? fakerData.password;

      // Check on compile time if user's and token's properties and value of keys within those properties are all string.
      interface CreateUserResponse {
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        };
        token: string;
      }
      
      const response = await CONTACT_LIST.post<CreateUserResponse>('/users', {
        firstName,
        lastName,
        email,
        password,
      });
      
      // REFACTOR ALL
      // LOG IN FIRST BEFORE CREATING NEW CONTACT
      let createdUserFilePath: string;
      switch (from) {
        case 'create contact':
          createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-create-contact.json');
          break;
        case 'create invalid contact':
          createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-create-invalid-contact.json');
          break;
        case 'create user':
          createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-created.json');
          break;
        case 'contact list':
          createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-contact-list.json');
          break;
        case 'specific contact':
          createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-specific-contact.json');
          break;
        default:
          createdUserFilePath = '';
          break;
      }
      createdUserFilePath != '' ? fs.writeFileSync(createdUserFilePath, JSON.stringify(response.data, null, 2)) : null;
      
      const responseData: string = JSON.stringify(response.data, null, 2);
      const responseStatus: string = JSON.stringify(response.status, null, 2);
      loggingUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);
      
      // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
      return { email, password, responseData, responseStatus };
    
  } catch (error: any) {
    loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
    throw error;
  }
}

export async function invalidCreationOfUser(firstName: string, lastName: string, email: string, password: string): Promise<{ errorResponseData: string, errorResponseMessage: string; errorResponseStatus: string } | undefined> {
  try {
    // Check on compilte time if user's and token's properties and value of keys within those properties are all string.
    interface CreateUserResponse {
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
      token: string;
    }
    
    await CONTACT_LIST.post<CreateUserResponse>('/users', {
      firstName,
      lastName,
      email,
      password,
    });
    
  } catch (error: any) {
    if (error.response) {
      const errorResponseMessage: string = error.response.data.message;
      const errorResponseStatus: string = JSON.stringify(error.status, null, 2);
      const errorResponseData: string = JSON.stringify({ 
        httpErrorMessage: error.message,
        errorMessage: errorResponseMessage,
        responseStatus: errorResponseStatus
      }, null, 2);

      loggingUtil.logMessage("info", `Invalid Creation of User - RESPONSE status: ${errorResponseStatus}`);
      loggingUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(errorResponseData, null, 2)}`);

      return { errorResponseData, errorResponseMessage, errorResponseStatus };
    }
  }
}