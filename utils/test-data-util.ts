import fs from 'fs';
import path from 'path';

export class DatasetUtil {
    private testDataType: string;
    private TESTDATA_PATH: string;
    private DATA: any;
    private CHECK_PATH_EXIST: boolean;

    constructor(testDataType: string = 'ui') {
        this.testDataType = testDataType.toLowerCase(); // 'ui' or 'api'
        this.TESTDATA_PATH = this.getTestDataPath();
        this.DATA = null;
        this.CHECK_PATH_EXIST = false;
    }

    private getTestDataPath(): string {
        /** Dynamically resolve the test data path based on the type (UI or API). */
        const FILE_NAME = this.testDataType === 'api' ? 'api-test-data.json' : 'ui-test-data.json';
        return path.join(process.cwd(), 'test-data', FILE_NAME);
    }

    private checkTestDataPath(): boolean {
        /** Check if the test data path exists. */
        if (!this.CHECK_PATH_EXIST) {
            if (!fs.existsSync(this.TESTDATA_PATH)) {
                return false;
            }
            this.CHECK_PATH_EXIST = true;
        }
        return true;
    }

    private loadData(): any {
        /** Load test data from the JSON file. */
        if (!this.DATA) {
            if (!this.checkTestDataPath()) {
                return null; // Return null if the path doesn't exist
            }
            try {
                const FILE_DATA = fs.readFileSync(this.TESTDATA_PATH, 'utf-8');
                this.DATA = JSON.parse(FILE_DATA);
            } catch (error) {
                return null;
            }
        }
        return this.DATA;
    }

    public getTestData(key: string, subKey: string | null = null): any {
        /** Retrieve data for a given key and optional subKey from the loaded test data. */
        const JSON_DATA = this.loadData();
        if (!JSON_DATA) return null;

        const result = subKey ? JSON_DATA[key][subKey] : JSON_DATA[key];

        if (result === undefined) {
            throw new Error(`Key "${key}"${subKey ? ` and subKey "${subKey}"` : ''} not found in test data.`);
        }
        return result;
    }
}

export default DatasetUtil;
