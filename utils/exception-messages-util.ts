// Element Interaction - Click and Input
export const EXCEPTION_ERROR_CLICK_ELEMENT = (selector: string, error: Error) => `ERROR CLICKING ELEMENT ${selector}: ${error?.message}`;
export const EXCEPTION_ERROR_FILL_DATA = (selector: string, error: Error) => `ERROR FILLING DATA IN ${selector}: ${error?.message}`;
 
// Verify and Wait Element
export const EXCEPTION_ERROR_VERIFY_ELEMENT = (selector: string, error: Error) =>
    `ERROR CHECKING VISIBILITY FOR ${selector}: ${error?.message}`;
export const EXCEPTION_ERROR_VISIBLE_ELEMENT = (selector: string, error: Error) =>
    `ERROR: ELEMENT VISIBILITY CHECK FOR ${selector} FAILED: ${error.message}`;
 
// Text Assertion
export const EXCEPTION_ASSERTION_ELEMENT = (error: Error) => `AN ERROR OCCURRED GETTING THE ATTRIBUTE: ${error?.message}`;
 
// API Error
export const EXCEPTION_API_MESSAGE = (error: Error) => `AN ERROR OCCURRED IN API TRANSACTION ${error?.message}`;
 
// Screenshot Error
export const EXCEPTION_SCREENSHOT_MESSAGE = (error: Error) => `Failed to capture screenshot: ${error?.message}`;
 
// Screenshot Error
export const EXCEPTION_TEST_DATA_LOADER_MESSAGE = (error: Error) => `File not found: ${error?.message}`;
 
 
 
 
 
 
 
 
 
 