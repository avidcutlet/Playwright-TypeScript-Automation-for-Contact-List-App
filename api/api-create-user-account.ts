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

// User Creation function
export async function creationOfUser(from: string | null): Promise<{ email: string; password: string; responseData: string; responseStatus: string}> {
    try {
        const randEmail: string = fakerData.email;
        const password: string = fakerData.password;
        
        // An early compile-time error detection.
        // Check on runtime if user's and token's properties and value of keys within those properties are all string.
        // If not for interface the type of the data in interface will be `any` 
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
            firstName: fakerData.firstName,
            lastName: fakerData.lastName,
            email: randEmail,
            password,
        });
        
        let createdUserFilePath: string;
        if (from === 'create contact'){
            createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-create-contact.json');
            
        }else if (from === 'create invalid contact'){
            createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-for-create-invalid-contact.json');
            
        }else {
            createdUserFilePath = path.join(process.cwd(), 'api-tokens', 'api-user-created.json');
        }
        
        fs.writeFileSync(createdUserFilePath, JSON.stringify(response.data, null, 2));
        
        const email: string = response.data.user.email;
        const responseData: string = JSON.stringify(response.data, null, 2);
        const responseStatus: string = JSON.stringify(response.status, null, 2);
        logginUtil.logMessage("info", `User data: ${JSON.stringify(response.data, null, 2)}`);
        
        // Returns object with key-value pair, if keys aren't explicitly defined the variable name of value will be the same key
        // Take object response variable in lines 35-39 for example
        return { email, password, responseData, responseStatus };
        
    } catch (error: any) {
        logginUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
        throw error;
    }
}

// Contact Creation function
export async function creationOfContact(): Promise<{ fullName: string; responseData: string; responseStatus: string}> {
    try {
        const dataSetAPIToken = new DatasetUtil('tokenforcreatecontact');
        const authToken: string = dataSetAPIToken.getTestData('token');
        const firstName: string = fakerData.firstName;
        const lastName: string = fakerData.lastName;
        
        // An early compile-time error detection.
        // Check on runtime if value of keys within are all string.
        // If not for interface the type of the data in interface will be `any` 
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

        console.log(`Bearer Token------>: ${authToken}`);

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
        
        // An early compile-time error detection.
        // Check on runtime if value of keys within are all string.
        // If not for interface the type of the data in interface will be `any` 
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

            console.log(`-------------------------------------------------`);
            console.log(`An error occurred, but no HTTP response was received or available on error.RESPONSE.`);
            console.log(`responseData: ${responseData}`); // Log the error message or the error object itself
            console.log(`responseStatus: ${responseStatus}`); // Log the error message or the error object itself
 
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
