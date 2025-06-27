import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

import { expect } from '@playwright/test';

import DatasetUtil from '@utils/test-data-util';
import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';

const logginUtil: LoggingUtility = new LoggingUtility();
const dataSetAPI = new DatasetUtil('api');
const CONTACT_LIST = axios.create({ baseURL: process.env.BASE_URL || dataSetAPI.getTestData('URL', 'URL') });

// User Creation function
export async function creationofUser(): Promise<{ email: string; password: string; responseData: string; }> {
    try {
        const randFirstName: string = faker.person.firstName();
        const randLastName: string = faker.person.lastName();
        const randEmail: string = faker.internet.email({ firstName: randFirstName, lastName: randLastName });
        const randPassword: string = faker.internet.password({ length: 12 });

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

        const RESPONSE = await CONTACT_LIST.post<CreateUserResponse>('/users', {
            firstName: randFirstName,
            lastName: randLastName,
            email: randEmail,
            password: randPassword,
        });

        expect(RESPONSE.status).toBe(201);

        const createdUserFilePath: string = path.join(process.cwd(), 'api-tokens', 'api-user-created.json');
        fs.writeFileSync(createdUserFilePath, JSON.stringify(RESPONSE.data, null, 2));

        const email: string = RESPONSE.data.user.email;
        const responseData: string = JSON.stringify(RESPONSE.data, null, 2);
        logginUtil.logMessage("info", `User data: ${JSON.stringify(RESPONSE.data, null, 2)}`);

        return { email: email, password: randPassword, responseData };

    } catch (error: any) {
        logginUtil.logMessage("error", EXCEPTION_API_MESSAGE(error));
        throw error;
    }
}
