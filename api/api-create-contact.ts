import axios from 'axios';
import fs from 'fs';
import path from 'path';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';
import { generateContactData } from '@testData/test-data-generator';

const logginUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');

const fakerData = generateContactData();
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// Contact Creation function
export async function creationOfContact(): Promise<{ createdContact: string; responseData: string; responseStatus: string}> {
    try {
        const dataSetAPIToken = new DatasetUtil('tokenforcreatecontact');
        const authToken: string = dataSetAPIToken.getTestData('token');
        const firstName: string = fakerData.firstName;
        const lastName: string = fakerData.lastName;
        const birthdate: string = fakerData.birthdate;
        const email: string = fakerData.email;
        const phone: string = fakerData.phone;
        const street1: string = fakerData.street1;
        const street2: string = fakerData.street2;
        const city: string = fakerData.city;
        const stateProvince: string = fakerData.stateProvince;
        const postalCode: string = fakerData.postalCode;
        const country: string = fakerData.country;
        
        // Check on runtime if value of keys within are all string.
        interface CreateContactResponse {
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
        }

        const newContactData = {
            firstName,
            lastName,
            birthdate,
            email,
            phone,
            street1,
            street2,
            city,
            stateProvince,
            postalCode,
            country,
        };

        const response = await CONTACT_LIST.post<CreateContactResponse>('/contacts', newContactData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json', // Often good practice to explicitly set this
            }
        });

        const createdContactFilePath: string = path.join(process.cwd(), 'api-tokens', 'api-contact-created.json');
        fs.writeFileSync(createdContactFilePath, JSON.stringify(response.data, null, 2));

        const responseData: string = JSON.stringify(response.data, null, 2);
        const responseStatus: string = JSON.stringify(response.status, null, 2);
        const createdContact: string = JSON.stringify({
          firstName,
          lastName,
          birthdate,
          email,
          phone,
          street1,
          street2,
          city,
          stateProvince,
          postalCode,
          country,
        }, null, 2);

        logginUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);

        // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
        return { createdContact, responseData, responseStatus };

    } catch (error: any) {
        logginUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
        throw error;
    }
}

// Invalid Contact Creation function
export async function invalidCreationOfContact(
  firstName: string,
  lastName: string,
  birthdate: string,
  email: string,
  phone: string,
  street1: string,
  street2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: string,
  authToken: string
): Promise<{ errorResponseData: string; errorResponseStatus: string;} | undefined> {
  try {

    
    // Check on runtime if value of keys within are all string.
    interface CreateInvalidContactResponse {
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
    }
    
    const invalidContactData = {
      firstName,
      lastName,
      birthdate,
      email,
      phone,
      street1,
      street2,
      city,
      stateProvince,
      postalCode,
      country,
    };
    
    await CONTACT_LIST.post<CreateInvalidContactResponse>('/contacts', invalidContactData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', // Often good practice to explicitly set this
      },
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

      const createdContactFilePath: string = path.join(process.cwd(), 'api-tokens', 'api-invalid-contact-created.json');
      
      fs.writeFileSync(
        createdContactFilePath,
        JSON.stringify({
          httpErrorMessage: error.message,
          errorData: errorResponseData,
          status: errorResponseStatus,
        }, null, 2)
      );
      
      logginUtil.logMessage("info", `Invalid Creation of User - RESPONSE status: ${errorResponseStatus}`);
      logginUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(errorResponseData, null, 2)}`);

      return { errorResponseData, errorResponseStatus };
    }
  }
}
