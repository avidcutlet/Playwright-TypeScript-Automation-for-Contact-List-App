import fs from 'fs';
import path from 'path';

export class DatasetUtil {
    private testDataType: string;
    private testDataPath: string;
    private data: any;
    private checkPathExist: boolean;

    constructor(testDataType: string = 'ui') {
        this.testDataType = testDataType.toLowerCase(); // 'ui', 'api' or, 'api tokens'
        this.testDataPath = this.getTestDataPath();
        this.data = null;
        this.checkPathExist = false;
    }

    // Get test data path
    private getTestDataPath(): string {
        /** Dynamically resolve the test data path based on the type (UI or API). */
        let fileName: string;
        if (this.testDataType === 'api'){
            fileName = 'api-test-data.json';
        
        }else if(this.testDataType === 'ui'){
            fileName = 'ui-test-data.json';

        }else if (this.testDataType === 'tokenforcreatecontact') {
            fileName = '../api-tokens/api-user-for-create-contact.json';
            
        }else if (this.testDataType === 'tokenforcreateinvalidcontact'){
            fileName = '../api-tokens/api-user-for-create-invalid-contact.json';
        }
        return path.join(process.cwd(), 'test-data', fileName!);
    }

    // Check test data path
    private checkTestDataPath(): boolean {
        /** Check if the test data path exists. */
        if (!this.checkPathExist) {
            if (!fs.existsSync(this.testDataPath)) {
                return false;
            }
            this.checkPathExist = true;
        }
        return true;
    }

    // Load data
    private loadData(): any {
        /** Load test data from the JSON file. */
        if (!this.data) {
            if (!this.checkTestDataPath()) {
                return null; // Return null if the path doesn't exist
            }
            try {
                const fileData = fs.readFileSync(this.testDataPath, 'utf-8');
                this.data = JSON.parse(fileData);
            } catch (error) {
                return null;
            }
        }
        return this.data;
    }

    // Get test data
    public getTestData(key: string, subKey: string | null = null): any {
        /** Retrieve data for a given key and optional subKey from the loaded test data. */
        const jsonData = this.loadData();
        if (!jsonData) return null;

        const result = subKey ? jsonData[key][subKey] : jsonData[key];

        if (result === undefined) {
            throw new Error(`Key "${key}"${subKey ? ` and subKey "${subKey}"` : ''} not found in test data.`);
        }
        return result;
    }
}

export default DatasetUtil;
