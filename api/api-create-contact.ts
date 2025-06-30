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
export async function creationOfContact(): Promise<{ fullName: string; responseData: string; responseStatus: string}> {
    try {
        const dataSetAPIToken = new DatasetUtil('tokenforcreatecontact');
        const authToken: string = dataSetAPIToken.getTestData('token');
        const firstName: string = fakerData.firstName;
        const lastName: string = fakerData.lastName;
        
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
            birthdate: fakerData.birthdate,
            email: fakerData.email,
            phone: fakerData.phone,
            street1: fakerData.street1,
            street2: fakerData.street2,
            city: fakerData.city,
            stateProvince: fakerData.stateProvince,
            postalCode: fakerData.postalCode,
            country: fakerData.country,
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
        const fullName: string = `${firstName} ${lastName}`;
        logginUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);

        // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
        return { fullName, responseData, responseStatus };

    } catch (error: any) {
        logginUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
        throw error;
    }
}

// Invalid Contact Creation function
export async function invalidCreationOfContact(): Promise<{ responseData: string; responseStatus: string;} | undefined> {
    try {
        const dataSetAPIToken = new DatasetUtil('tokenforcreateinvalidcontact');
        const firstName: string = dataSetAPI.getTestData('AddInvalidContactData', 'firstName');
        const lastName: string = dataSetAPI.getTestData('AddInvalidContactData', 'lastName');
        const authToken: string = dataSetAPIToken.getTestData('token');
        const birthdate: string = dataSetAPI.getTestData('AddInvalidContactData', 'birthdate');
        const email: string = dataSetAPI.getTestData('AddInvalidContactData', 'email');
        const phone: string = dataSetAPI.getTestData('AddInvalidContactData', 'phone');
        const street1: string = dataSetAPI.getTestData('AddInvalidContactData', 'street1');
        const street2: string = dataSetAPI.getTestData('AddInvalidContactData', 'street2');
        const city: string = dataSetAPI.getTestData('AddInvalidContactData', 'city');
        const stateProvince: string = dataSetAPI.getTestData('AddInvalidContactData', 'stateProvince');
        const postalCode: string = dataSetAPI.getTestData('AddInvalidContactData', 'postalCode');
        const country: string = dataSetAPI.getTestData('AddInvalidContactData', 'country');
        
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
            const responseStatus: string = JSON.stringify(error.status, null, 2);
            const responseData: string = JSON.stringify({ errorData: error.message, status: responseStatus }, null, 2);
 
            const createdContactFilePath: string = path.join(process.cwd(), 'api-tokens', 'api-invalid-contact-created.json');
            
            fs.writeFileSync(
                createdContactFilePath,
                JSON.stringify({
                    errorData: responseData,
                    status: responseStatus,
                }, null, 2)
            );
            
            logginUtil.logMessage("info", `Invalid Creation of User - RESPONSE status: ${responseStatus}`);
            logginUtil.logMessage("info", `Error RESPONSE from API: ${JSON.stringify(responseData, null, 2)}`);

            return { responseData, responseStatus };
        }
    }
}
