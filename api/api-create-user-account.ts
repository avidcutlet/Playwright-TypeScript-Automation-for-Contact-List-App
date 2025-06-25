import fs from 'fs';
import path from 'path';

import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';

import axios from 'axios';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

const loggingUtility: LoggingUtility = new LoggingUtility();

const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || "" });

// User Creation function
export async function creationofUser(): Promise<{ EMAIL: string; PASSWORD: string; }> {
    try {
        // Generate random user data using Faker
        const RAND_FIRST_NAME: string = faker.person.firstName();
        const RAND_LAST_NAME: string = faker.person.lastName();
        const RAND_EMAIL: string = faker.internet.email({ firstName: RAND_FIRST_NAME, lastName: RAND_LAST_NAME });
        const RAND_PASSWORD: string = faker.internet.password({ length: 12 });

        // Define the expected response data type
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

        // API call to create a user
        const RESPONSE = await CONTACT_LIST.post<CreateUserResponse>('/users', {
            firstName: RAND_FIRST_NAME,
            lastName: RAND_LAST_NAME,
            email: RAND_EMAIL,
            password: RAND_PASSWORD,
        });

        // Verify the user creation status
        expect(RESPONSE.status).toBe(201);

        const createdUserFilePath: string = path.join(process.cwd(), 'api-tokens', 'api-user-created.json');
        fs.writeFileSync(createdUserFilePath, JSON.stringify(RESPONSE.data, null, 2));

        const USER_ID: string = RESPONSE.data.user._id;
        const TOKEN: string = RESPONSE.data.token;
        const EMAIL: string = RESPONSE.data.user.email;
        const RESPONSE_DATA: string = JSON.stringify(RESPONSE.data, null, 2);
        loggingUtility.logMessage("info", `User data: ${JSON.stringify(RESPONSE.data, null, 2)}`);

        return { EMAIL, PASSWORD: RAND_PASSWORD };

    } catch (error: any) {
        loggingUtility.logMessage("error", EXCEPTION_API_MESSAGE(error));
        throw error;
    }
}

// Invalid User Creation function
export async function invalidCreationofUser(testdata: { firstName: string; lastName: string; email: string; password: string }): Promise<string | undefined> {
    try {

        // API call to create a user
        const RESPONSE = await CONTACT_LIST.post('/users', {
            firstName: testdata.firstName,
            lastName: testdata.lastName,
            email: testdata.email,
            password: testdata.password,
        });

    } catch (error: any) {
        if (error.RESPONSE) {
            expect(error.RESPONSE.status).toBe(400);

            // Log the error data into a file
            const ERROR_FILE_PATH: string = path.join(process.cwd(), 'api_tokens', 'invalid_user_creation.json');
            fs.writeFileSync(ERROR_FILE_PATH, JSON.stringify({ errorData: error.RESPONSE.data, status: error.RESPONSE.status }, null, 2));

            const RESPONSE_DATA: string = JSON.stringify({ errorData: error.RESPONSE.data, status: error.RESPONSE.status }, null, 2);

            return RESPONSE_DATA;
        }
    }
}
