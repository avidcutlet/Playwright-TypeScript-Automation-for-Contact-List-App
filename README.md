# Contact_List_Playwright_Typescript_Automation
This is an automation using Playwright Typescript on Contact List Website


/** To run specific browsers:

All configured browsers (chromium, firefox, webkit):
`npx playwright test`

Only Chromium:
`npx playwright test --project=chromium`

Only Firefox:
`npx playwright test --project=firefox`

Multiple specific browsers:
`npx playwright test --project=chromium --project=firefox`

**/

## Reporting and Logs
- Allure-results: These results are typically in the form of JSON files and contain detailed information about each test, including test steps, statuses, attachments, and other metadata. To generate the report to report/allure-report folder:
```
allure generate reports/allure-results --single-file --output reports/allure-reports --clean
```
- Logs: Logs are stored in the logs/ folder.
- Screenshots: Screenshots are captured automatically and saved in the report/Screenshots/ folder.